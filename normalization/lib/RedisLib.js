const redis = require('redis')
const { config } = require('../config')
const { redisDbHost, redisDbPort, redisDbPassword, redisDbName } = config

class RedisLib {
    constructor () {
        this.client = redis.createClient({
            host: redisDbHost,
            port: redisDbPort,
            password: redisDbPassword
        })
        this.dbName = redisDbName
        this.expireTime = 60 * 60 * 2
    }

    get (key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (error, data) => {
                if (error) {
                    return reject(error)
                }
                const response = data || null
                resolve(response)
            })
        })
    }

    set (key, value) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', this.expireTime, error => {
                if (error) {
                    return reject(error)
                }
                return resolve(true)
            })
        })
    }
}

module.exports = RedisLib
