const productSearchCriteria = require('../utils/mocks/productSearchCriteria.json')

class SourceLib {
    normalize (id, source, data, date) {
        const criteria = productSearchCriteria[id]
        let normalizedData = this._simplifyData(id, source, data, date)
        normalizedData = this._getVariant(normalizedData, criteria.filters.variants)
        normalizedData = this._applyCriteria(normalizedData, criteria.filters)
        return normalizedData
    }

    _normCondition (nameToChange, conditionsToReplace) {
        return conditionsToReplace[nameToChange.toLowerCase()] || ''
    }

    _getVariant (data, optionsToFind) {
        const regExpVariants = new RegExp(optionsToFind.join('|', 'i'))

        return data.filter(item => regExpVariants.test(item.title))
            .map(item => {
                const itemObj = {
                    ...item,
                    variant: item.title.match(regExpVariants)[0]
                }
                delete itemObj.title
                return itemObj
            })
    }

    _applyCriteria (data, filters) {
        const keysFilters = Object.keys(filters)
        // Example -> itemAttributes = [ 'condition', 'model', 'variant' ] without 's' in the end
        const itemAttributes = keysFilters.map(item => item.slice(0, -1))
        const regExpList = keysFilters.map(keyFilter => new RegExp(filters[keyFilter].join('|'), 'i'))

        return data.filter(item => {
            const testList = itemAttributes.filter((attribute, index) =>
                regExpList[index].test(item[attribute])
            )
            return testList.length === itemAttributes.length
        })
    }
}

module.exports = SourceLib
