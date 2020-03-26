const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const RedisLib = require('../../lib/RedisLib')
const { generateRandomToken } = require('../../utils/token')
const { authJwtKey } = require('../../config/index').config

const TWO_HOURS_IN_SEC = 7200

class AuthService {
    constructor () {
        this.collection = 'keys'
        this.redisDB = new RedisLib()
    }

    async validateKey (key) {
        if (key !== authJwtKey) {
            throw boom.unauthorized()
        }

        const secret = generateRandomToken()
        const token = jwt.sign({ key: key }, secret, { expiresIn: TWO_HOURS_IN_SEC })

        const tokenSaved = await this.redisDB.set(token, secret)

        if (tokenSaved === true) {
            return token
        } else {
            throw boom.internal(tokenSaved)
        }
    }
}

module.exports = AuthService
