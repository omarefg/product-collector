const MongoLib = require('../../lib/mongo');


class KeywordsService {
  constructor(){
    this.collection = 'keywords';
    this.mongoDB = new MongoLib();
  }
  async getKeywords() {
    const query = {};
    const keywords = await this.mongoDB.getAll(this.collection, query);
    return keywords || [];
  }
  async getKeyword({ keywordId }) {
    const Keyword = await this.mongoDB.get(this.collection, keywordId);
    return Keyword || {};
  }
  async createKeyword({ keyword }) {
    const createKeywordId = await this.mongoDB.create(this.collection, keyword);
    return createKeywordId;
  }
  async updateKeyword({ keywordId, keyword }) {
    const updatedKeywordId = await this.mongoDB.update(this.collection, keywordId, keyword);
    return updatedKeywordId;
  }
  async deleteKeyword({ keywordId }) {
    const deletedKeywordId = await this.mongoDB.delete(this.collection, keywordId);
    return deletedKeywordId;
  }

}
module.exports = KeywordsService;