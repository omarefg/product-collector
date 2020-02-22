const MongoConnect = require("../../lib/mongo");
const { config } = require("../../config");

class CountriesService {
  constructor() {
    this.mongodb = new MongoConnect();
    this.collection = "countries";
  }

  async createCountries(data) {
    try {
      const countries = data.map((item) => {
        const obj = {
          _id: item.id,
          ...item
        };
        delete obj.id;
        return obj;
      });
      return await this.mongodb.createMany(this.collection, countries);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CountriesService;
