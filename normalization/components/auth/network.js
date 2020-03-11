const express = require('express')
const boom = require('@hapi/boom')
const AuthService = require('./services')
const response = require('../../network/response')
const authService = new AuthService()

const router = express.Router()

router.post('/token', async function (req, res, next) {
    const { authKey } = req.body
    if (!authKey) {
        next(boom.unauthorized())
    }
    try {
        const token = await authService.validateKey(authKey)
        response.success(req, res, token)
    } catch (error) {
        next(boom.unauthorized())
    }
})

module.exports = router
