const express = require('express')
const router = require('./network/router')

const notFound = require('./utils/middleware/notFoundHandler')
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers')
const { config } = require('./config/index')

/**
 * Es aquí donde implementamos un servidor de express el cual usará un enrrutador y middlewares de manejo de errores
 * para dar respuesta a las peticiones que reciba.
 */
const app = express()
// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'PUT,POST,PATCH,DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use(express.json({ limit: '20MB' }))

router(app)
app.use(notFound)

app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`)
})
