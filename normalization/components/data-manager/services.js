const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom')

const RedisLib = require('../../lib/RedisLib')
const MercadoLibreLib = require('../../lib/MercadoLibreLib')

class DataManagerService {
    constructor () {
        this.collection = 'products'
        this.redisDB = new RedisLib()
        this.mercadoLibre = new MercadoLibreLib()
    }

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

    normalize (dataReqBody) {
        const { id, source, data, date } = dataReqBody
        switch (source) {
        case 'PCML': {
            return this.mercadoLibre.normalize(id, source, data, date)
        }
        case 'PCAMZ': {
            return {}
        }
        default: return {}
        }
    }
}

module.exports = DataManagerService
