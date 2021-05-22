process.env.NODE_ENV ='test'
const { beforeEach } = require('@jest/globals')
const chai = require('chai')
chai.use(require('chai-http'))
const User = require('../models/user')

module.exports = {
    chai: chai,
    expec: chai.expect,
    app: require('../app'),
    User: User
}

beforeEach(function (done) {
    User.deleteMany({})
    .then(() => {
        done()
    })
    .catch(error => {
        done(error.message)
    })
})