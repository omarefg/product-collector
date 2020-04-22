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

  async getProduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct(products) {
    const createProductId = await this.mongoDB.createMany(
      this.collection,
      products
    );
    return createProductId;
  }

  async updateProduct({ ProductId, product }) {
    const updatedProductId = await this.mongoDB.update(
      this.collection,
      ProductId,
      product
    );
    return updatedProductId;
  }

  async deleteProduct({ ProductId }) {
    const deletedProductId = await this.mongoDB.delete(
      this.collection,
      ProductId
    );
    return deletedProductId;
  }
}

module.exports = ProductsService;
