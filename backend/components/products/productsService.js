const MongoLib = require('../../lib/mongo');

class ProductsService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts({ categories }) {
    const query = categories && { categories: { $in: categories } };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }
}

module.exports = ProductsService;
