require('dotenv').config()

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,

    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,

    redisDbUser: process.env.REDIS_DB_USER,
    redisDbPassword: process.env.REDIS_DB_PASSWORD,
    redisDbHost: process.env.REDIS_DB_HOST,
    redisDbPort: process.env.REDIS_DB_PORT,
    redisDbName: process.env.REDIS_DB_NAME,

    nodeEnv: process.env.NODE_ENV

}

module.exports = {
    config
}
