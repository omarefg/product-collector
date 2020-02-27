const MongoLib = require('../lib/mongo')
const bcrypt = require('bcrypt')

class UsersService {
    constructor () {
        this.collection = 'users'
        this.mongoDB = new MongoLib()
    }

    async getUser ({ email }) {
        const query = email && { email: email }

        const [user] = await this.mongoDB.getAll(this.collection, query)
        return user
    }

    async createUser ({ user }) {
        const { name, email, password } = user
        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUserId = await this.mongoDB.create(this.collection, {
            name,
            email,
            password: hashedPassword
        })
        return createdUserId
    }

    async verifyUserExists ({ email }) {
        const query = email && { email: email }
        const [user] = await this.mongoDB.getAll(this.collection, query)
        return user
    }

    async updateUser ({ userId, user } = {}) {
        const { name, email, password } = user
        const hashedPassword = await bcrypt.hash(password, 10)
        const updatedUserId = await this.mongoDB.update(this.collection, userId, {
            name,
            email,
            password: hashedPassword
        })
        return updatedUserId
    }

    async deleteUser ({ userId }) {
        const deletedUserId = await this.mongoDB.delete(this.collection, userId)
        return deletedUserId
    }
}

module.exports = UsersService
