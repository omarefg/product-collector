const express = require('express');
const helmet = require('helmet');
const app = express();

// Documentacion swagger
const swaggerUi = require('swagger-ui-express');

const { config } = require('./config/index');
const productsApi = require('./components/products/routes');
const keywordsApi = require('./components/keywords/routes');
const categoriesApi = require('./components/categories/routes');

// body parser
app.use(express.json());
app.use(helmet());

const swaggerDoc = require('./swagger.json');

//Routes
productsApi(app);
keywordsApi(app);
categoriesApi(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Server rest
app.listen(config.port, function() {
  console.log(`Server REST running on port ${config.port}`);
});
