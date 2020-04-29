const SourceLib = require('./SourceLib')
const countries = require('../utils/mocks/countriesMock.json')
const { removeDiacritics } = require('../utils/grammar')

class AmazonLib extends SourceLib {
    _simplifyData (id, source, data, date) {
        const conditionsToReplace = { new: 'new', used: 'used', renewed: 'refurbished' }
        const keyWord = data.query
        const country = removeDiacritics(countries[source].data.filter(item => item.id === data.site_id)[0].name)

        const results = data.results.map(item => ({
            id,
            keyWord,
            country,
            title: item.name.toLowerCase(),
            countryState: '',
            currency: item.currency.toLowerCase(),
            condition: item.condition ? this._normCondition(item.condition, conditionsToReplace) : '',
            model: item.model ? item.model.toLowerCase() : '',
            price: item.price,
            soldQuantity: 0,
            date
        }))

        return results
    }
}

module.exports = AmazonLib
