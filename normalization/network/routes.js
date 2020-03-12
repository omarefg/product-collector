const normatizationAuth = require('../components/auth/network')
const normalizationDataManager = require('../components/data-manager/network')

const routes = function (server) {
    server.use('/normalization/auth', normatizationAuth)
    server.use('/normalization/data-manager', normalizationDataManager)
}

module.exports = routes
