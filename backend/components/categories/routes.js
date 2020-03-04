const express = require('express');
const { categoriesMock } = require('../../utils/mocks/categoriesMock');

function categoriesApi(app) {
  const router = express.Router();
  app.use('/api/categories', router);

  router.get('/', async function(req, res, next) {
    try {
      const categories = await Promise.resolve(categoriesMock);
      res.status(200).json({
        data: categories,
        message: 'categories list'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = categoriesApi;
