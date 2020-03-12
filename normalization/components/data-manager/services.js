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

    async save () {
        try {
            const id = await this.mongoDB.create(this.collection, {
                date: '2020-01-01',
                keyword: 'xbox',
                country: 'CO',
                origin: 'mercadolibre',
                categoryName: 'Categoria',
                productName: 'Xbox One',
                visits: 1420
            })
            return id
        } catch (error) {
            throw new Error(error)
        }
    }

    normalize () {

    }

    async searchForSecretByToken (token) {
        try {
            const secret = await this.redisDB.get(token)
            if (!secret) {
                throw boom.unauthorized()
            }
            jwt.verify(token, secret)
            await this.save()
            return { token, secret }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = DataManagerService
