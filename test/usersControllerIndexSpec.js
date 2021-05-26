const { chai, expect, app, User } = require('./common')

const userData = require('./seed')
const threeUsers = [contacts[0], contacts[2], contacts[1]]


describe('userController', function () {
    beforeEach(function (done) {
        User.saveUser(threeUsers)
            .then(createdUsers => {
                done()
            })
            .catch(error => {
                console.log('error caught' + error.message)
                done(error.message)
            })

    })

    describe('user list', function () {
        it('show ok on /user', function (done) {
            chai.request(app)
                .get('/user')
                .end((errors, res) => {
                    expect(res).to.have.status(200)
                    expect(errors).to.be.equal(null)
                    done()
                })

        })

        it('show all users in db', function (done) {
            chai.request(app)
                .get('/user')
                .end((errors, res) => {
                    const body = res.text
                    for (const user of threeUsers) {
                        expect(body).to.include(contacts.firstName)
                        expect(body).to.include(user.email)
                    }
                    done()
                })
        })
    })
})




