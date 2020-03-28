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

router.get('/encrypt-data', async function ({ body: { encryptMyData } }, res, next) {
    if (!encryptMyData.data) {
        next(boom.badRequest('No exist data to encrypt'))
    }

    try {
        const encryptedPassword = await authService.encryptData(encryptMyData)
        response.success({}, res, encryptedPassword, 200)
    } catch (error) {
        next(boom.badImplementation())
    }
})

module.exports = router
