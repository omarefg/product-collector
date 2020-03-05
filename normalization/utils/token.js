const crypto = require('crypto')

function generateRandomToken () {
    const buffer = crypto.randomBytes(32)
    return buffer.toString('hex')
}

module.exports = {
    generateRandomToken
}
