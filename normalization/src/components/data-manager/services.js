const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom')

const RedisLib = require('../../lib/RedisLib')
const MercadoLibreLib = require('../../lib/MercadoLibreLib')
const AmazonLib = require('../../lib/AmazonLib')
const sendNormalizedData = require('./store')
class DataManagerService {
    constructor () {
        this.collection = 'products'
        this.redisDB = new RedisLib()
        this.mercadoLibre = new MercadoLibreLib()
        this.amazon = new AmazonLib()
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
            return this.amazon.normalize(id, source, data, date)
        }
        default: return {}
        }
    }

    sendNormalizedData (normalizedData) {
        return sendNormalizedData(normalizedData)
    }
}

module.exports = DataManagerService
