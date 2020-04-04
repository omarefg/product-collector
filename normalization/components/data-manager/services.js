const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom')

const RedisLib = require('../../lib/RedisLib')
const countries = require('../../utils/mocks/countriesMock.json')
const productSearchCriteria = require('../../utils/mocks/productSearchCriteria.json')

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
        const { id, source, data, date } = dataReqBody
        const criteria = productSearchCriteria[id]
        switch (source) {
        case 'PCML': {
            try {
                return this.normalizeFromML(criteria, id, source, data, date)
            } catch (error) {
                throw boom.badRequest(error.message)
            }
        }
        default: return {}
        }
    }

    async normalizeFromML (criteria, id, source, data, date) {
        // const dataToResponse = this.reduceByFiltersFromML(data, criteria.filters)
        let dataToResponse = this._simplifyDataFromML(id, source, data, date)
        dataToResponse = this._getVariantFromML(dataToResponse, criteria.filters.variants)
        return dataToResponse
    }

    _simplifyDataFromML (id, source, data, date) {
        try {
            const results = data.results.map(item => ({
                title: item.title.toLowerCase(),
                // countryState: item.address.state_name.toLowerCase(),
                currency: item.currency_id.toLowerCase(),
                condition: item.attributes.filter(item => item.id === 'ITEM_CONDITION')[0],
                model: item.attributes.filter(item => item.id === 'MODEL')[0],
                price: item.price,
                soldQuantity: item.sold_quantity,
                date
            }))

            return {
                id,
                keyWord: data.query,
                country: countries[source].data.filter(item => item.id === data.site_id)[0].name,
                results: results.map(item => ({
                    ...item,
                    condition: item.condition ? item.condition.value_name.toLowerCase() : 'undefined',
                    model: item.model ? item.model.value_name.toLowerCase() : 'undefined'
                }))
            }
        } catch (error) {
            throw boom.badRequest(error.message)
        }
    }

    _getVariantFromML (data, optionsToFind) {
        const regExpVariants = new RegExp(optionsToFind.join('|'))
        return {
            ...data,
            results:
            data.results
                .filter(item => regExpVariants.test(item.title))
                .map(item => ({
                    ...item,
                    variant: item.title.match(regExpVariants)[0],
                    title: undefined
                }))
        }
    }
}

module.exports = DataManagerService
