const express = require('express');
const { productsMock } = require('../../utils/mocks/productsMock');

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products', router);

  router.get('/', async function(req, res, next) {
    try {
      const products = await Promise.resolve(productsMock);
      res.status(200).json({
        data: products,
        message: 'products list'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = productsApi;
