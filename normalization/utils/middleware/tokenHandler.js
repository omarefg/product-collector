const boom = require('@hapi/boom')

async function tokenHandler (req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        return next(boom.unauthorized())
    }
    next()
}

module.exports = tokenHandler
