const express = require('express');
const ProductsService = require('./productsService');

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products', router);
  const productsService = new ProductsService();

  router.get('/', async function(req, res, next) {
    const { categories } = req.query;
    try {
      const products = await productsService.getProducts({ categories });
      res.status(200).json({
        data: products,
        message: 'products listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    try {
      const products = await productsService.getProduct({ productId });
      res.status(200).json({
        data: products,
        message: 'product retrieved'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function(req, res, next) {
    const { body: product } = req;
    try {
      const createdProductId = await productsService.createProduct({ product });
      res.status(201).json({
        data: createdProductId,
        message: 'product created'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = productsApi;
