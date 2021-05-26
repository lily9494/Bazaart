const { disconnect } = require('mongoose')
const { expect, User } = require('./common')

const testUserData = {
    firstName = 'Claude',
    LastName = 'Farmer',
    email: 'email@htw.de',
    username: 'CF'

}

describe('userController', function () {
    describe('save user', function () {
        it('should save the posted user', function (done) {
            const testUser = new User(testUserData)
            testUser.save()
                .then(() => {
                    User.find({})
                        .then(result => {
                            expect(result.length).to.eq(1)
                            expect(result[0]).to.have.property('_id')
                            done()
                        })
                })
                .catch((error) => {
                    done(error.message)
                })
        })
    })
})