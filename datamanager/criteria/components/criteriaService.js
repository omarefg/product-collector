const MongoLib = require('../lib/mongo');

class CriteriaService {
    constructor(){
        this.collection = 'criteria';
        this.mongoDB = new MongoLib();
    }
    async getCriteria(){
        const query = {};
        const criteria = await this.mongoDB.getAll(this.collection, query);
        return criteria || [];
    }
    async createCriteria({ criteria }) {
        const createCriteriaId = await this.mongoDB.create(this.collection, criteria);
        return createCriteriaId;
    }
    async deleteCriteria({ criteriaId }) {
        const deletedCriteriaId = await this.mongoDB.delete(this.collection, criteriaId);
        return deletedCriteriaId;
      }
}
module.exports = CriteriaService;