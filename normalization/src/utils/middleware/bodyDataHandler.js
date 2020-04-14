/**
 *
 * @module bodyDataHandler
 */
const boom = require('@hapi/boom')

/**
 * Esta función se encarga de verificar si el body
 * de la petición contiene la información que nos interesa,
 * en este caso necesitamos el source el cual nos indica la procedencia de los datos.
 * tambien verificamos si los datos están contenidos dentro de un array
 * @param {object} req - La petición
 * @param {object} res - La respuesta
 * @param {object} next - El siguiente middleware
 */
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
