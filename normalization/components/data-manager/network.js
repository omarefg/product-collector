const express = require('express')
const boom = require('@hapi/boom')
const DataManagerService = require('./services')
const response = require('../../network/response')
const tokenHandler = require('../../utils/middleware/tokenHandler')
const dataManagerService = new DataManagerService()

const router = express.Router()

router.post(
    '/normalize',
    tokenHandler,
    async function (req, res, next) {
        const token = req.headers.authorization
        const { data, source } = req.body
        try {
            const { token: t, secret } = await dataManagerService.searchForSecretByToken(token)
            response.success(req, res, { token: t, secret }, 201)
        } catch (error) {
            next(boom.unauthorized())
        }
    })

module.exports = router
