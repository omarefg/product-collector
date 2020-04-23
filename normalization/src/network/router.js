/**
 * ## Enrrutador del API
 * @module router
 */

/**
 * Requerimos el enrrutador del componente de autorización
 */
const normalizationAuth = require('../components/auth/network')
/**
 * Requerimos el enrrutador del componente de nuestro manejador de datos
 * para ver su funcionamiento ve al siguiente link
* para ver su funcionamiento ve al siguiente link
 * [dataManager](https://documentacion-normalizacion.now.sh/DataManagerService.html "dataManager")
 */
const normalizationDataManager = require('../components/data-manager/network')

/**
 * Declaramos la función para enrrutar el componente al path expecifico.

 * @param {string} server - el servidor de express
 * @return {string} - La ruta exacta del API
 */
const routes = function (server) {
    server.use('/normalization/auth', normalizationAuth)
    server.use('/normalization/data-manager', normalizationDataManager)
}

module.exports = routes
