const axios = require('axios')

const sendNormalizedData = async (target, normalizedData) => {
    const { data: { data } } = await axios({
        method: 'post',
        url: target.input,
        data: normalizedData
    })

    return data
}

module.exports = sendNormalizedData
