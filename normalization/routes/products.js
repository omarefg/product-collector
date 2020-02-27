const express = require('express')

const passport = require('passport')
const ProductsService = require('../services/products')
const { createProductSchema} = require('../utils/schemas/products')

const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

// JWT STRATEGY
require('../utils/auth/strategies/jwt')

function productsApi (app) {
    const router = express.Router()
    app.use('/api/products', router)

    const productsService = new ProductsService()

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:products']),
        async function (req, res, next) {
            const { productId } = req.query

            try {
                const products = await productsService.getProducts({ productId })
                res.status(200).json({
                    data: products,
                    message: 'products listed'
                })
            } catch (err) {
                next(err)
            }
        })

    router.post(
        '/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:products']),
        validationHandler(createProductSchema),
        async function (req, res, next) {
            const { body: product } = req
            try {
                const createdProductId = await productsService.createProduct({ product })

                res.status(201).json({
                    data: createdProductId,
                    message: 'product created'
                })
            } catch (err) {
                next(err)
            }
        }
    )
}

module.exports = productsApi
