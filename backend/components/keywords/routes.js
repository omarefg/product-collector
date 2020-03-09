const express = require('express');


function keywordsApi(app) {
  const router = express.Router();
  app.use('/api/keywords', router);


}

module.exports = keywordsApi;
