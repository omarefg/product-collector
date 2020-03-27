const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom')

const RedisLib = require('../../lib/RedisLib')
const countries = require('../../utils/mocks/countriesMock.json')

class DataManagerService {
    constructor () {
        this.collection = 'products'
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

    async normalize (dataReqBody) {
        const { data, source } = dataReqBody
        let dataNorm = []

        try {
            dataNorm = data.results.map(item => {
                const {
                    site_id: site,
                    title,
                    price,
                    currency_id: currency,
                    available_quantity: availableQuantity,
                    sold_quantity: soldQuantity,
                    condition,
                    category_id: categoryId
                } = item

                return {
                    country: countries[source].data.filter(item => item.id === site)[0].name,
                    title,
                    price,
                    currency,
                    availableQuantity,
                    soldQuantity,
                    condition,
                    categoryId
                }
            })
        } catch (error) {
            boom.badRequest(error.message)
        }

        return dataNorm
    }
}

module.exports = DataManagerService
