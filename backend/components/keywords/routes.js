const express = require('express');
const { keywordsMock } = require('../../utils/mocks/keywordsMock');

function keywordsApi(app) {
  const router = express.Router();
  app.use('/api/keywords', router);

  router.get('/', async function(req, res, next) {
    try {
      const keywords = await Promise.resolve(keywordsMock);
      res.status(200).json({
        data: keywords,
        message: 'keyords list'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = keywordsApi;
