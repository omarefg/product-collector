const express = require('express')
const boom = require('@hapi/boom')

const AuthService = require('./services')
const response = require('../../network/response')

const router = express.Router()
const authService = new AuthService()

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
