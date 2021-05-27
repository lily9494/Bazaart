  
process.env.NODE_ENV = 'test'
const Users = require('../models/users')
const request = require('supertest')
module.exports = {
  app: require('../app'),
  Users: user,
  request: request
}

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

afterAll(async () => {
  await db.close()
})

beforeEach(function (done) {
  // console.log('global beforeEach')
  Users.deleteMany({})
    .then(() => {
      // console.log('all courses deleted')
      done()
    })
    .catch(error => {
      // console.log('error caught: ' + error.message)
      done(error.message)
    })
})