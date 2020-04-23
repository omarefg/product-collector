/**
 * Requerimos boom para el manejo de errores
 */
const boom = require('@hapi/boom')
/**
 * Requerimos Json Web Token para crear token de autenticación
 */
const jwt = require('jsonwebtoken')

/**
 * Requerimos la instancia de redis para almacenar el Json Web Token de manera temporar
 */
const RedisLib = require('../../lib/RedisLib')
const { generateRandomHex, isOkDecrypt, encryptDynamicHash } = require('../../utils/auxToken')
const { authKey } = require('../../config/index').config

const TWO_HOURS_IN_SEC = 7200

/**
 * @class AuthService
 */

class AuthService {
    constructor () {
        this.redisDB = new RedisLib(TWO_HOURS_IN_SEC)
    }

    /**
     * Función encargada verificar la validez de la llave de autenticación
     * hace uso de las siguientes utilidades
     * @param {string} authKeyHashed llave de autenticación
     * @returns token firmado de autenticación
     */
    async validateKey (authKeyHashed) {
        const authKeyOk = await isOkDecrypt(authKey, authKeyHashed)
        if (!authKeyOk) {
            throw boom.unauthorized()
        }

        const secret = generateRandomHex()
        const token = jwt.sign({ key: authKey }, secret, { expiresIn: TWO_HOURS_IN_SEC })

        const tokenSaved = await this.redisDB.set(token, secret)

        if (tokenSaved === true) {
            return token
        } else {
            throw boom.internal(tokenSaved)
        }
    }

    /**
     * Función encargada de generar llaves de autenticación seguras
     * @param {string} dataToEncrypt data a encriptar
     */
    async encryptData (dataToEncrypt) {
        const { data, rounds } = dataToEncrypt
        const encryptedData = await encryptDynamicHash(data, rounds)
        return encryptedData
    }
}

module.exports = AuthService
