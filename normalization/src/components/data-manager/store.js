const axios = require('axios')

const sendNormalizedData = async (target, normalizedData) => {
    const { data: { data } } = await axios({
        method: 'post',
        url: 'https://rest-api-mocha.now.sh/api/products',
        data: normalizedData
    })

    return data
}

module.exports = sendNormalizedData
