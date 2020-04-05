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
        switch (source) {
        case 'PCML': {
            try {
                return this.normalizeFromML(id, source, data, date)
            } catch (error) {
                throw boom.badRequest(error.message)
            }
        }
        default: return {}
        }
    }

    async normalizeFromML (id, source, data, date) {
        const criteria = productSearchCriteria[id]
        let normalizedData = await this._simplifyDataFromML(id, source, data, date)
        normalizedData = this._getVariantFromML(normalizedData, criteria.filters.variants)
        normalizedData = this._applyCriteriaForML(normalizedData, criteria.filters)
        return normalizedData
    }

    async _simplifyDataFromML (id, source, data, date) {
        try {
            const results = data.results.map(item => ({
                title: item.title.toLowerCase(),
                countryState: item.address.state_name,
                currency: item.currency_id.toLowerCase(),
                condition: item.attributes.filter(item => item.id === 'ITEM_CONDITION')[0],
                conditions: item.attributes.filter(item => item.id === 'ITEM_CONDITION')[0],
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
                    condition: item.condition ? item.condition.value_name.toLowerCase() : '',
                    conditions: item.condition ? item.condition.value_name.toLowerCase() : '',
                    model: item.model ? item.model.value_name.toLowerCase() : '',
                    models: item.model ? item.model.value_name.toLowerCase() : ''
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
            results: data.results
                .filter(item => regExpVariants.test(item.title))
                .map(item => {
                    const itemObj = {
                        ...item,
                        variant: item.title.match(regExpVariants)[0],
                        variants: item.title.match(regExpVariants)[0]
                    }
                    delete itemObj.title
                    return itemObj
                })
        }
    }

    _applyCriteriaForML (data, filters) {
        const keys = Object.keys(filters)
        filters.conditions = ['nuevo', 'usado', 'reacondicionado']
        return {
            ...data,
            results: data.results.filter(item => {
                let itsGoingToBeReturned = true
                for (let i = 0; i < keys.length; i++) {
                    if (filters[keys[i]].length > 0 && !filters[keys[i]].includes(item[keys[i]])) {
                        itsGoingToBeReturned = false
                    }
                    delete item[keys[i]]
                }
                return itsGoingToBeReturned
            })
        }
    }
}

module.exports = DataManagerService
