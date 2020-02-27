const express = require('express')

const app = express()

const { config } = require('./config/index')

const authApi = require('./routes/auth')
const productsApi = require('./routes/products')

app.use(express.json())

authApi(app)
productsApi(app)

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`)
})
