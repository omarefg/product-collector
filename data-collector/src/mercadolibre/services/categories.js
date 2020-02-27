const MongoConnect = require("../../lib/mongo");
const { config } = require("../../config");

class CategoriesService {
  constructor() {
    this.mongodb = new MongoConnect();
    this.collection = "categories";
  }

  createCategories(data) {
    try {
      const categories = data.map((item) => {
        const obj = {
          _id: item.id,
          ...item
        };
        delete obj.id;
        return obj;
      });
      return this.mongodb.createMany(this.collection, categories);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCategories() {
    try {
      const data = await this.mongodb.getAll(this.collection, {});
      return data;
    } catch (error) {
      // throw new Error(error);
    }
  }
}

module.exports = CategoriesService;
