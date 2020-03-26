const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const RedisLib = require('../../lib/RedisLib')
const { generateRandomHex, isOkDecrypt } = require('../../utils/auxToken')
const { authKey } = require('../../config/index').config

const TWO_HOURS_IN_SEC = 7200

class AuthService {
    constructor () {
        this.redisDB = new RedisLib(TWO_HOURS_IN_SEC)
    }

    async validateKey (authKeyHashed) {
        const authKeyOk = await isOkDecrypt(authKey, authKeyHashed)
        if (!authKeyOk) {
            throw boom.unauthorized()
        }

        const secret = generateRandomHex()
        const token = jwt.sign({ key: authKey }, secret, { expiresIn: TWO_HOURS_IN_SEC })

        const tokenSaved = await this.redisDB.set(token, secret)

        if (tokenSaved === true) {
            return token
        } else {
            throw boom.internal(tokenSaved)
        }
    }
}

module.exports = AuthService
