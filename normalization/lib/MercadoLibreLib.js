const countries = require('../utils/mocks/countriesMock.json')
const productSearchCriteria = require('../utils/mocks/productSearchCriteria.json')

class MercadoLibreLib {
    normalize (id, source, data, date) {
        const criteria = productSearchCriteria[id]
        let normalizedData = this._simplifyData(id, source, data, date)
        normalizedData = this._getVariant(normalizedData, criteria.filters.variants)
        normalizedData = this._applyCriteria(normalizedData, criteria.filters)
        return normalizedData
    }

    _simplifyData (id, source, data, date) {
        const conditionsToReplace = { nuevo: 'new', usado: 'used', reacondicionado: 'refurbished' }

        const results = data.results.map(item => ({
            title: item.title.toLowerCase(),
            countryState: item.address.state_name,
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
                condition: item.condition ? this._normCondition(item.condition.value_name, conditionsToReplace) : '',
                model: item.model ? item.model.value_name.toLowerCase() : ''
            }))
        }
    }

    _normCondition (nameToChange, conditionsToReplace) {
        return conditionsToReplace[nameToChange.toLowerCase()] || ''
    }

    _getVariant (data, optionsToFind) {
        const regExpVariants = new RegExp(optionsToFind.join('|', 'i'))
        return {
            ...data,
            results: data.results
                .filter(item => regExpVariants.test(item.title))
                .map(item => {
                    const itemObj = {
                        ...item,
                        variant: item.title.match(regExpVariants)[0]
                    }
                    delete itemObj.title
                    return itemObj
                })
        }
    }

    _applyCriteria (data, filters) {
        const keysFilters = Object.keys(filters)
        // Example -> itemAttributes = [ 'condition', 'model', 'variant' ] without 's' in the end
        const itemAttributes = keysFilters.map(item => item.slice(0, -1))
        const regExpList = keysFilters.map(keyFilter => new RegExp(filters[keyFilter].join('|'), 'i'))

        return {
            ...data,
            results: data.results.filter(item => {
                const testList = itemAttributes.filter((attribute, index) =>
                    regExpList[index].test(item[attribute])
                )
                return testList.length === itemAttributes.length
            })
        }
    }
}

module.exports = MercadoLibreLib
