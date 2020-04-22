
/**
 * @module util-auxToken
 */
/**
 * Requerimos crypto para generar llaves de autenticación encriptadas
 */
const crypto = require('crypto')
/**
 * Requerimos bcrypt para comparar cadenas encriptadas
 */
const bcrypt = require('bcrypt')

/**
 * Función encargada de generar un número haxadecimal aleatorio
 * @param {number} bytes longitud de número
 */
function generateRandomHex (bytes = 32) {
    const buffer = crypto.randomBytes(bytes)
    return buffer.toString('hex')
}

/**
 * Función encargada de verificar si la llave de autenticación coindise con la llave secreto
 * @param {string} data llave de autenticación
 * @param {string} dataToDecrypt secreto
 * @returns {string} token desencriptado
 */
async function isOkDecrypt (data, dataToDecrypt) {
    const decrypted = await bcrypt.compare(data, dataToDecrypt)
    return decrypted
}

/**
 * Función encargada de generar un hash dependiendo del numero de iteraciones de incriptación
 * @param {string} data
 * @param {number} rounds numero de interaciones
 * @returns {string} hash encriptado
 */
async function encryptDynamicHash (data, rounds = 7) {
    const maxRounds = 15
    const minRounds = 4
    const defaultRounds = 7

    rounds = (maxRounds >= rounds && rounds >= minRounds) ? rounds : defaultRounds

    const hash = await bcrypt.hash(data, rounds)
    return hash
}

module.exports = {
    generateRandomHex,
    isOkDecrypt,
    encryptDynamicHash
}
