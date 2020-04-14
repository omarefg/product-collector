/**
 *
 * @module tokenHandler
 */
const boom = require('@hapi/boom')

/**
 * Aquí obtenemos la petición y verificamos si contiene el token de verificación
 * @param {object} req - La petición
 * @param {object} res - La respuesta
 * @param {object} next - Siguiente middleware
 */
async function tokenHandler (req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        next(boom.unauthorized())
    }
    next()
}

module.exports = tokenHandler
