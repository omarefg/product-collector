const axios = require('axios')

const sendNormalizedData = async (normalizedData) => {
    const { data: { data } } = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/products',
        data: normalizedData
    })

    return data
}

module.exports = sendNormalizedData
