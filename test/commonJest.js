process.env.NODE_ENV = 'test'
const User = require('../models/user')
const request = require('supertest')
const mongoose = require('mongoose')
module.exports = {
    app: require('../app'),
    User: User,
    request: request
}


const { afterAll, beforeEach } = require('@jest/globals')
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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