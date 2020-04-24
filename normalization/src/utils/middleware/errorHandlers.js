const boom = require('@hapi/boom')
const { config } = require('../../config/index')

function withErrorStack (error, stack) {
    if (config.dev === 'development') {
        return { ...error, stack }
    }
    return error
}
function logErrors (err, req, res, next) {
    console.log(err)
    next(err)
}

function wrapErrors (err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err))
    }
    next(err)
}
function errorHandler (err, req, res, next) {
    const { output: { statusCode, payload } } = err
    res.status(statusCode)
    res.json(withErrorStack(payload, err.stack))
}

module.exports = {
    logErrors,
    wrapErrors,
    errorHandler
}
