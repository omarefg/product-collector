const express = require('express')
const authApi = require('./routes/auth')
const { config } = require('./config/index')

const app = express()

app.use(express.json())

authApi(app)

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`)
})
