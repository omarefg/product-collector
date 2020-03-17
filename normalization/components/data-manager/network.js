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
        let tokenVerify = 1
        let dataNormalize = 1
        let dataId = 1

        try {
            const token = req.headers.authorization
            tokenVerify = await dataManagerService.searchForSecretByToken(token)
        } catch (error) {
            next(boom.unauthorized())
        }

        if (!tokenVerify) {
            dataNormalize = dataManagerService.normalize(req.body)
        }

        if (dataNormalize !== 1) {
            dataId = await dataManagerService.save(dataNormalize)
        }

        if (dataId !== 1) {
            response.success(req, res, dataId, 201)
        }
    }
)

module.exports = router
