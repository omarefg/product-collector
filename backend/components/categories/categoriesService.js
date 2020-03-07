const MongoLib = require('../../lib/mongo');


class CategoriesService {
  constructor(){
    this.collection = 'categories';
    this.mongoDB = new MongoLib();
  }
  async getCategories() {
    const query = {};
    const categories = await this.mongoDB.getAll(this.collection, query);
    return categories || [];
  }
  async getCategory({ categoryId }) {
    const Category = await this.mongoDB.get(this.collection, categoryId);
    return Category || {};
  }
  async createCategory({ category }) {
    const createCategoryId = await this.mongoDB.create(this.collection, category);
    return createCategoryId;
  }
  async updateCategory({ categoryId, category }) {
    const updatedCategoryId = await this.mongoDB.update(this.collection, categoryId, category);
    return updatedCategoryId;
  }
  async deleteCategory({ categoryId }) {
    const deletedCategoryId = await this.mongoDB.delete(this.collection, categoryId);
    return deletedCategoryId;
  }
}
module.exports = CategoriesService;
