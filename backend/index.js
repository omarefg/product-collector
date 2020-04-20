import { server } from './server';
import db from './database';

import express from 'express';
import helmet from 'helmet';
const app = express();

const { config } = require('./config/index');
const productsApi = require('./components/products/routes');
const keywordsApi = require('./components/keywords/routes');
const categoriesApi = require('./components/categories/routes');

// body parser
app.use(express.json());
app.use(helmet());

//Routes
productsApi(app);
keywordsApi(app);
categoriesApi(app);

db();

//Server graphql
server.start(({ port }) => {
  console.log(`Server running on port ${port}`);
});

//Server rest
app.listen(config.port, function() {
  console.log(`Listen http://localhost:${config.port}`);
});
