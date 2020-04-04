const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom')

const RedisLib = require('../../lib/RedisLib')
const countries = require('../../utils/mocks/countriesMock.json')
const productSearchCriteria = require('../../utils/mocks/productSearchCriteria.json')

// new - iphone11 - 64
// new - iphone11 - 128
// new - iphone11 - 256
// new - iphone11 pro - 64
// new - iphone11 pro - 128
// new - iphone11 pro - 256
// new - iphone11 pro max - 64
// new - iphone11 pro max - 128
// new - iphone11 pro max - 256

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

    async normalizeFromML ({ data, id, date, source }) {
        try {
            const criteria = productSearchCriteria[id]
            const normalized = data.results.map(item => {
                const {
                    address: { state_name: countryState },
                    price,
                    currency_id: currency,
                    sold_quantity: soldQuantity,
                    condition
                } = item

                return {
                    countryState,
                    currency,
                    condition,
                    price,
                    soldQuantity,
                    date
                }
            })
            return {
                id,
                keyWord: data.query,
                country: countries[source].data.filter(item => item.id === data.site_id)[0].name,
                normalized
            }
        } catch (error) {
            throw boom.badRequest(error.message)
        }
    }

    async normalize (dataReqBody) {
        const { data, source, id, date } = dataReqBody
        switch (source) {
        case 'PCML': {
            try {
                return this.normalizeFromML({ data, source, id, date })
            } catch (error) {
                throw boom.badRequest(error.message)
            }
        }
        default: return []
        }
    }
}

module.exports = DataManagerService
