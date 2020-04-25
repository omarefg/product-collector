const boom = require('@hapi/boom')

async function bodyDataHandler (req, res, next) {
    const { source, data } = req.body

    const errorSource = !(typeof source === 'string')
    const errorDataResult = !Array.isArray(data.results)

    if (errorSource || errorDataResult) {
        next(boom.badRequest('The key <source> or <data.result> has a error'))
    }

    next()
}

module.exports = bodyDataHandler
