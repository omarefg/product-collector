const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom')

const RedisLib = require('../../lib/RedisLib')
const MercadoLibreLib = require('../../lib/MercadoLibreLib')
const AmazonLib = require('../../lib/AmazonLib')
const sendNormalizedData = require('./store')

/**
 * Clase para definir los metodos que nos permitirán manipular los datos
 */
class DataManagerService {
    constructor () {
        this.collection = 'products'
        this.redisDB = new RedisLib()
        /** */
        this.mercadoLibre = new MercadoLibreLib()
        this.amazon = new AmazonLib()
    }

    /**
     * Esta función se encargará de verificar si el token que nos llega
     * por parametro efectivamente existe dentro de la base de datos creada en Redis
     * Si este proceso sale bien se generará un secreto el cual podemos verificar gracias a la libreria de JWT
     * @param {number|string} token - Token de autorización
     * @returns {number} - Si todo sale bien retornamos 0
     * @throws {string} - Si el token no coincide devolvemos un error
     */
    async searchForSecretByToken (token) {
        try {
            const secret = await this.redisDB.get(token)
            if (!secret) {
                throw boom.unauthorized()
            }
            jwt.verify(token, secret)
            return 0
        } catch (error) {
            throw new Error(error)
        }
    }

    /**
     * Este es el metodo que nos permite reducir la cantidad y calidad de los datos
     * dependiendo del origen de los mismos, aplicaremos una u otra normalización.
     * ### Opciones de normalización:
     * - [MercadoLibre](https://documentacion-normalizacion.now.sh/MercadoLibreLib.html "MercadoLibre")
     * @param {array} dataReqBody - Data a ser normalizada
     */
    async normalize (dataReqBody) {
        const { id, source, data, date, criteria, target } = dataReqBody
        let normalizedData = null

        switch (source) {
        case 'PCML': {
            try {
                normalizedData = await this.mercadoLibre.normalize(id, source, data, date, criteria)
            } catch (error) {
                throw boom.internal()
            }
            break
        }
        case 'PCAMZ': {
            try {
                normalizedData = await this.amazon.normalize(id, source, data, date, criteria)
            } catch (error) {
                throw boom.internal()
            }
            break
        }
        default: break
        }
        return this.sendData(target, normalizedData)
    }

    sendData (target, normalizedData) {
        return sendNormalizedData(target, normalizedData)
    }
}

module.exports = DataManagerService
