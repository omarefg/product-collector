const express = require('express')
const boom = require('@hapi/boom')
const AuthService = require('../services/AuthService')

function authApi (app) {
    const router = express.Router()
    app.use('/normalization/auth', router)

    const authService = new AuthService()

    router.post('/token', async function (req, res, next) {
        const { authKey } = req.body
        if (!authKey) {
            next(boom.unauthorized())
        }
        try {
            const token = await authService.validateKey(authKey)
            res.status(200).send({ token })
        } catch (error) {
            next(boom.unauthorized())
        }
    })
}

module.exports = authApi
