const joi = require('@hapi/joi')

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const productTitleSchema = joi.string().max(80)
const productDescriptionSchema = joi.string().max(300)

const createProductSchema = {
    title: productTitleSchema.required(),
    description: productDescriptionSchema.required()
}
const updateProductSchema = {
    title: productTitleSchema,
    description: productDescriptionSchema
}

module.exports = {
    productIdSchema,
    createProductSchema,
    updateProductSchema
}
