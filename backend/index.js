const express = require('express');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');

app.use(helmet());

app.use('/', function(req, res) {
  res.send('Hola');
});

app.listen(config.port, function() {
  console.log(`Listen http://localhost:${config.port}`);
});
