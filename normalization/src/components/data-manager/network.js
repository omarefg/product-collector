/**
 * ## Componente para el manejo de datos
 * @module Data-manager-network
 */
const express = require('express')
const boom = require('@hapi/boom')

const DataManagerService = require('./services')

const response = require('../../network/response')
/**
 * Middleware para validar la existencia del token dentro del request
 * lo puedes ver en el siguiente link
 * [tokenHandler](https://documentacion-normalizacion.now.sh/module-tokenHandler.html "tokenHandler")
 */
const tokenHandler = require('../../utils/middleware/tokenHandler')
/**
 * Middleware para validar que el request tiene los datos que esperamos recibir.
 * [bodyDataHandler](https://documentacion-normalizacion.now.sh/module-bodyDataHandler.html "bodyDataHandler")
 */
const bodyDataHandler = require('../../utils/middleware/bodyDataHandler')

const router = express.Router()
/**
 * Creamos a instancia a los servicios para el manejo de los datos
 *  {@link DataManagerService }
 */
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
                console.log(normalizedData)
                response.success({}, res, normalizedData)
            } catch (error) {
                next(boom.badImplementation(error.message))
            }
        } catch (error) {
            next(boom.unauthorized())
        }
    }
)

module.exports = router
