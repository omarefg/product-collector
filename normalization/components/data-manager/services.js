const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom')
const MongoLib = require('../../lib/MongoLib')
const RedisLib = require('../../lib/RedisLib')
const countriesML = require('../../utils/mocks/countriesMock.json')

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
        const { data } = dataReqBody

        const dataNorm = data.map(item => {
            const {
                id,
                site_id: site,
                title,
                price,
                currency_id: currency,
                available_quantity: availableQuantity,
                sold_quantity: soldQuantity,
                attributes,
                installments,
                category_id: categoryId
            } = item

            return {
                id,
                site: countriesML.data.filter(item => item.id === site)[0].name,
                title,
                price,
                currency,
                availableQuantity,
                soldQuantity,
                product_state: attributes[0].value_name,
                installments,
                categoryId
            }
        })

        return dataNorm
    }
}

module.exports = DataManagerService
