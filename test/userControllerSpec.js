const { expect } = require('./common')
const userController = require('./controllers/userController')

describe('userController', function() {
    describe('getUserParams', function() {
        it('should extract user parameters from request body', function() {
            const expected = {
                firstName: 'Claude',
                lastName: 'Farmer',
                email: 'email@htw.de',
                username: 'CF',
                passwort: 'testPW'

            }

            const body = { ... { a: 'b', c: 'd', ... expected} }
            expect(userController.getUserParams(body)).to.deep.equal(expected)
        })
        it('should return an empty object with empty request', function() {
            const emptyBody = {}
            expect(userController.getUserParams(emptyBody)).to.deep.equal({})

        })

    })
})