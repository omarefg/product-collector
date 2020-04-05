const MercadoLibreLib = require('./MercadoLibreLib')
const countries = require('../utils/mocks/countriesMock.json')

class AmazonLib extends MercadoLibreLib {
    _simplifyData (id, source, data, date) {
        const conditionsToReplace = { new: 'new', used: 'used', renewed: 'refurbished' }

        const results = data.results.map(item => ({
            title: item.name.toLowerCase(),
            countryState: '',
            currency: item.currency.toLowerCase(),
            condition: item.condition ? this._normCondition(item.condition, conditionsToReplace) : '',
            model: item.model ? item.model.toLowerCase() : '',
            price: item.price,
            soldQuantity: 0,
            date
        }))

        return {
            id,
            keyWord: data.query,
            country: countries[source].data.filter(item => item.id === data.site_id)[0].name,
            results
        }
    }
}

module.exports = AmazonLib
