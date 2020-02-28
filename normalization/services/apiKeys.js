const MongoLib = require('../lib/mongo')
const boom = require('@hapi/boom')
const { generateRandomToken } = require('../scripts/mongo/seedApiKeys')
const jwt = require('jsonwebtoken')

class ApiKeysService {
    constructor () {
        this.collection = 'api-keys'
        this.mongoDB = new MongoLib()
    }

    async validateTokens ({ k1, k2 }) {
        const [token] = await this.mongoDB.getAll(this.collection, { k1, k2 })
        if (!token) {
            throw boom.unauthorized()
        }
        return token
    }
}

module.exports = ApiKeysService
