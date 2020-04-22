const express = require('express');
const CategoriesService = require('./categoriesService');

function categoriesApi(app) {
  const router = express.Router();
  app.use('/api/categories', router);
  const categoriesService = new CategoriesService();

  router.get('/',async function(req, res, next) {
    const { tags } = req.query;
    try {
      const categories = await categoriesService.getCategories(tags);
      res.status(200).json({
        data: categories,
        message: 'categories listed'
      });
    } catch (err) {
      next(err);
    }
  });
  router.get(
    '/:categoryId',
    async function(req, res, next) {
      const { categoryId } = req.params;
      try {
        const categories = await categoriesService.getCategory({ categoryId });

        res.status(200).json({
          data: categories,
          message: 'categories retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.post('/', 
    async function(
    req,
    res,
    next
  ) {
    const { body: category } = req;
    try {
      const createdCategoryId = await categoriesService.createCategory({ category });

      res.status(201).json({
        data: createdCategoryId,
        message: 'category created'
      });
    } catch (err) {
      next(err);
    }
  });
  router.patch(
    '/:categoryId',
    async function(req, res, next) {
      const { categoryId } = req.params;
      const { body: category } = req;
      try {
        const updatedCategoryId = await categoriesService.updateCategory({
          categoryId,
          category
        });

        res.status(200).json({
          data: updatedCategoryId,
          message: 'category patched'
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.delete(
    '/:categoryId',
    async function(req, res, next) {
      const { categoryId } = req.params;
      try {
        const deletedCategoryId = await categoriesService.deleteCategory({ categoryId });
        res.status(200).json({
          data: deletedCategoryId,
          message: 'category deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );

}

module.exports = categoriesApi;
