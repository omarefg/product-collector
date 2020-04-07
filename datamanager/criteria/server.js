const express = require('express');

const app = express();
const criteriaAPI = require('./components/routes');

const { config } = require('./config/index');

app.use(express.json());

criteriaAPI(app);

app.listen(config.port, function (){
    console.log(`La aplicación está escuchando en http://localhost:${config.port}`);
})
