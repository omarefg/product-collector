const MongoLib = require('../lib/MongoLib')
const RedisLib = require('../lib/RedisLib')
const boom = require('@hapi/boom')
const { generateRandomToken } = require('../utils/token')
const jwt = require('jsonwebtoken')
const TWO_HOURS_IN_SEC = 7200

class AuthService {
    constructor () {
        this.collection = 'keys'
        this.mongoDB = new MongoLib()
        this.redisDB = new RedisLib()
    }

    async validateKey (key) {
        const [app] = await this.mongoDB.getAll(this.collection, { key })

        if (!app) {
            throw boom.unauthorized()
        }

        const secret = generateRandomToken()
        const token = jwt.sign({ id: app.id }, secret, { expiresIn: TWO_HOURS_IN_SEC })

        const tokenSaved = await this.redisDB.set(token, secret)

        if (tokenSaved === true) {
            return token
        } else {
            throw boom.internal(tokenSaved)
        }
    }
}

module.exports = AuthService
