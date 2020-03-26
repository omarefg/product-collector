const crypto = require('crypto')
const bcrypt = require('bcrypt')

function generateRandomHex (bytes = 32) {
    const buffer = crypto.randomBytes(bytes)
    return buffer.toString('hex')
}

async function isOkDecrypt (data, dataToDecrypt) {
    const decrypted = await bcrypt.compare(data, dataToDecrypt)
    return decrypted
}

async function encryptDynamicHash (data, salt = 8) {
    const hash = await bcrypt.hash(data, salt)
    return hash
}

module.exports = {
    generateRandomHex,
    isOkDecrypt,
    encryptDynamicHash
}
