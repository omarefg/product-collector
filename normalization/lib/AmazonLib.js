const countries = require('../utils/mocks/countriesMock.json')
const productSearchCriteria = require('../utils/mocks/productSearchCriteria.json')

class AmazonLib {
    normalize (id, source, data, date) {
        const criteria = productSearchCriteria[id]
        let normalizedData = this._simplifyData(id, source, data, date)
        normalizedData = this._getVariant(normalizedData, criteria.filters.variants)
        normalizedData = this._applyCriteria(normalizedData, criteria.filters)
        return normalizedData
    }

    _simplifyData (id, source, data, date) {
        const results = data.results.map(item => ({
            title: item.name.toLowerCase(),
            countryState: '',
            currency: item.currency.toLowerCase(),
            condition: '',
            conditions: '',
            model: '',
            price: item.price,
            soldQuantity: '',
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
    }

    _getVariant (data, optionsToFind) {
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

    _applyCriteria (data, filters) {
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

module.exports = AmazonLib
