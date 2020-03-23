const express = require('express')
const boom = require('@hapi/boom')
const AuthService = require('./services')
const response = require('../../network/response')
const authService = new AuthService()

const router = express.Router()

router.post('/token', async function ({ body: { authKey } }, res, next) {
    if (!authKey) {
        next(boom.unauthorized())
    }
    try {
        const token = await authService.validateKey(authKey)
        response.success({}, res, token)
    } catch (error) {
        next(boom.unauthorized())
    }
})

module.exports = router
