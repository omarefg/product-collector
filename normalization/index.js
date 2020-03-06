const express = require('express')
const authApi = require('./routes/auth')
const notFound = require('./utils/middleware/notFoundHandler')
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers')
const { config } = require('./config/index')

const app = express()

app.use(express.json())

authApi(app)
app.use(notFound)

app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`)
})
