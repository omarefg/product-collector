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

  router.put('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    const { body: keyword } = req;
    try {
      const updatedProductId = await productsService.updateProduct({
        productId,
        keyword
      });

      res.status(200).json({
        data: updatedProductId,
        message: 'keyword patched'
      });
    } catch (err) {
      next(err);
    }
  });
  router.delete('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    try {
      const deletedProductId = await productsService.deleteProduct({
        productId
      });
      res.status(200).json({
        data: deletedProductId,
        message: 'keyword deleted'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = productsApi;
