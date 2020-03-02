const express = require('express');
const app = express();

const { config } = require('./config/index');

app.use('/', function(req, res) {
  console.log(req);
  res.send('Hola');
});

app.listen(config.port, function() {
  console.log(`Listen http://localhost:${config.port}`);
});
