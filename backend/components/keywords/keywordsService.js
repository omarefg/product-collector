const MongoLib = require('../../lib/mongo');


class KeywordsService {
  constructor(){
    this.collection = 'keywords';
    this.mongoDB = new MongoLib();
  }

}
module.exports = KeywordsService;