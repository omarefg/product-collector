const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')

const ApiKeysService = require('../services/apiKeys')
const UsersService = require('../services/users')

const validationHandler = require('../utils/middleware/validationHandler')

const { createUserSchema } = require('../utils/schemas/users')

const { config } = require('../config')

// Basic strategy
require('../utils/auth/strategies/basic')

function authApi (app) {
    const router = express.Router()
    app.use('/api/auth', router)

    const apiKeysService = new ApiKeysService()
    const usersService = new UsersService()

    const THIRTY_DAYS_IN_SEC = 2592000
    const TWO_HOURS_IN_SEC = 7200

    router.post('/sign-in', async function (req, res, next) {
        const { k1, k2 } = req.body

        if (!k1 || !k2) {
            next(boom.unauthorized('tokens are required'))
        }

        const { token } = await apiKeysService.validateTokens({ k1, k2 })
        res.status(200).send({ token })
    })

    router.post('/sign-up', validationHandler(createUserSchema), async (req, res, next) => {
        const { body: user } = req

        try {
            const userExists = await usersService.verifyUserExists({ user })
            if (userExists) {
                res.status(200).json({
                    data: userExists,
                    message: 'user already exists'
                })
                return
            }
            const createUserId = await usersService.createUser({ user })
            res.status(201).json({
                data: createUserId,
                message: 'user created'
            })
        } catch (error) {
            next(error)
        }
    })
}

module.exports = authApi
