const express = require('express');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');
const productsApi = require('./components/products/routes');
const keywordsApi = require('./components/keywords/routes');
const categoriesApi = require('./components/categories/routes');

app.use(helmet());
productsApi(app);
keywordsApi(app);
categoriesApi(app);

app.listen(config.port, function() {
  console.log(`Listen http://localhost:${config.port}`);
});
