const express = require('express')
const boom = require('@hapi/boom')
const DataManagerService = require('./services')
const response = require('../../network/response')
const tokenHandler = require('../../utils/middleware/tokenHandler')
const bodyDataHandler = require('../../utils/middleware/bodyDataHandler')
const dataManagerService = new DataManagerService()

const router = express.Router()

router.post(
    '/normalize',
    tokenHandler,
    bodyDataHandler,
    async function ({ headers: { authorization }, body }, res, next) {
        try {
            await dataManagerService.searchForSecretByToken(authorization)
            try {
                const idDB = await dataManagerService.normalize(body)
                response.success({}, res, idDB, 201)
            } catch (error) {
                next(boom.badImplementation(error.message))
            }
        } catch (error) {
            next(boom.unauthorized())
        }
    }
)

module.exports = router
