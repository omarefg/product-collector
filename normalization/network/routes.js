
const normatizationAuth = require('../components/auth/network')

const routes = function (server) {
    server.use('/normalization/auth', normatizationAuth)
}

module.exports = routes
