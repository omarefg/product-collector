const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom')
const MongoLib = require('../../lib/MongoLib')
const RedisLib = require('../../lib/RedisLib')

class DataManagerService {
    constructor () {
        this.collection = 'products'
        this.mongoDB = new MongoLib()
        this.redisDB = new RedisLib()
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

    async save (dataToSave) {
        try {
            return await this.mongoDB.create(this.collection, dataToSave)
        } catch (error) {
            throw boom.internal(error.message)
        }
    }

    async normalize (dataReqBody) {
        const countriesIdsMercadoLibre = { MCO: 'CO', MLA: 'AR' }
        const { data, source } = dataReqBody

        const dataNorm = {
            date: data[3].date_from,
            keyword: data[0].id,
            country: countriesIdsMercadoLibre[data[0].site_id],
            origin: source,
            categoryName: data[1].category,
            productName: data[0].title,
            visits: data[3].total_visits
        }

        return this.save(dataNorm)
    }
}

module.exports = DataManagerService
