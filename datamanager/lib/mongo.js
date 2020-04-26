const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoConnect {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.dbName = DB_NAME;
  }
  connect() {
    if (!MongoConnect.connection) {
      MongoConnect.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          console.log("Connected succesfully to mongo");
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoConnect.connection;
  }

  getAll(collection, query) {
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then((db) => db.collection(collection).insertOne(data))
      .then((result) => result.insertedId);
  }

  createMany(collection, data) {
    return this.connect()
      .then((db) => db.collection(collection).insertMany(data))
      .then((result) => result)
      .catch((err) => console.error(err));
  }
  deleteMany(collection, data) {
    return this.connect()
      .then((db) => db.collection(collection).deleteMany(data))
      .then((result) => result)
      .catch((err) => console.error(err));
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoConnect;