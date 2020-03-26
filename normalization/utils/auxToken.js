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

async function encryptDynamicHash (data, rounds = 7) {
    const maxRounds = 15
    const minRounds = 4
    const defaultRounds = 7

    if (typeof der === 'number') {
        rounds = defaultRounds
    } else {
        rounds = (maxRounds >= rounds && rounds >= minRounds) ? rounds : defaultRounds
    }

    const hash = await bcrypt.hash(data, rounds)
    return hash
}

module.exports = {
    generateRandomHex,
    isOkDecrypt,
    encryptDynamicHash
}
