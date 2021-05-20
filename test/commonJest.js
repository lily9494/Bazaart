process.env.NODE_ENV = 'test'
const User = require('./models/user')
const request = require('supertest')
module.exports = {
    app: require('./app')
    User: User,
    request: request
}

const mongoos = require('mongoose')
const { afterAll, beforeEach } = require('@jest/globals')
mongoos.Mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

afterAll(async () => {
    await db.close()

})

beforeEach(function (done) {
    User.deleteMany({})
    .then(() => {
        done()
    })
    .catch(error => {
        done(error.message)
    })
})