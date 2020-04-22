const express = require('express')
const boom = require('@hapi/boom')

const DataManagerService = require('./services')
const response = require('../../network/response')
const tokenHandler = require('../../utils/middleware/tokenHandler')
const bodyDataHandler = require('../../utils/middleware/bodyDataHandler')

const router = express.Router()
const dataManagerService = new DataManagerService()

router.post(
    '/normalize',
    tokenHandler,
    bodyDataHandler,
    async function ({ headers: { authorization }, body }, res, next) {
        try {
            await dataManagerService.searchForSecretByToken(authorization)

            try {
                const normalizedData = await dataManagerService.normalize(body)
                const savedDataIds = await dataManagerService.sendNormalizedData(normalizedData)
                response.success({}, res, savedDataIds, 200)
            } catch (error) {
                next(boom.badImplementation(error.message))
            }
        } catch (error) {
            next(boom.unauthorized())
        }
    }
)

module.exports = router
