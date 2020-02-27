const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const UserService = require('../../../services/users')

passport.use(
    new BasicStrategy(async (email, password, callback) => {
        const userService = new UserService()

        try {
            const user = await userService.getUser({ email })
            if (!user) {
                return callback(boom.unauthorized(), false)
            }
            if (!(await bcrypt.compare(password, user.password))) {
                return callback(boom.unauthorized(), false)
            }

            delete user.password
            return callback(null, user)
        } catch (error) {
            return callback(error)
        }
    })
)
