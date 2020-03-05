/* eslint-disable no-console */
const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const { dbUser, dbPassword, dbName, dbPort, dbHost, nodeEnv } = config

const DB_USER = encodeURIComponent(dbUser)
const DB_PASSWORD = encodeURIComponent(dbPassword)
let MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${dbHost}/${dbName}?retryWrites=true&w=majority`

if (nodeEnv === 'development') {
    MONGO_URI = `mongodb://${dbHost}:${dbPort}`
}

class MongoLib {
    constructor () {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        this.dbName = dbName
    }

    connect () {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        return reject(err)
                    }

                    console.log('MongoDB Conected')
                    resolve(this.client.db(this.dbName))
                })
            })
        }

        return MongoLib.connection
    }

    // METHODS
    getAll (collection, query) {
        return this.connect()
            .then(db => {
                return db.collection(collection).find(query).toArray()
            })
            .catch(error => {
                throw error
            })
    }

    get (collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) })
        })
    }

    create (collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data)
        }).then(result => result.insertedId)
    }

    update (collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne(
                { _id: ObjectId(id) },
                { $set: data },
                { upsert: true }
            )
        }).then(result => result.upsertedId || id)
    }

    delete (collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) })
        }).then(() => id)
    }
}

module.exports = MongoLib
