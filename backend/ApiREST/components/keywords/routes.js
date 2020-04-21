const express = require('express');
const KeywordsService = require('./keywordsService');


function keywordsApi(app) {
  const router = express.Router();
  app.use('/api/keywords', router);
  const keywordsService = new KeywordsService();

  router.get('/',async function(req, res, next) {
    const { tags } = req.query;
    try {
      const keywords = await keywordsService.getKeywords(tags);
      res.status(200).json({
        data: keywords,
        message: 'keywords listed'
      });
    } catch (err) {
      next(err);
    }
  });
  router.get(
    '/:keywordId',
    async function(req, res, next) {
      const { keywordId } = req.params;
      try {
        const keywords = await keywordsService.getKeyword({ keywordId });

        res.status(200).json({
          data: keywords,
          message: 'keywords retrieved'
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
    const { body: keyword } = req;
    try {
      const createdKeywordId = await keywordsService.createKeyword({ keyword });

      res.status(201).json({
        data: createdKeywordId,
        message: 'keyword created'
      });
    } catch (err) {
      next(err);
    }
  });
  router.patch(
    '/:keywordId',
    async function(req, res, next) {
      const { keywordId } = req.params;
      const { body: keyword } = req;
      try {
        const updatedKeywordId = await keywordsService.updateKeyword({
          keywordId,
          keyword
        });

        res.status(200).json({
          data: updatedKeywordId,
          message: 'keyword patched'
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.delete(
    '/:keywordId',
    async function(req, res, next) {
      const { keywordId } = req.params;
      try {
        const deletedKeywordId = await keywordsService.deleteKeyword({ keywordId });
        res.status(200).json({
          data: deletedKeywordId,
          message: 'keyword deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );

}

module.exports = keywordsApi;
