const axios = require('axios')

const sendNormalizedData = async (target, normalizedData) => {
    let axiosData = {
        method: 'post',
        url: target.endpoint,
        data: normalizedData
    }

    if (target.token) {
        axiosData = {
            ...axiosData,
            headers: {
                authorization: target.token
            }
        }
    }

    return await axios(axiosData)
}

module.exports = sendNormalizedData
