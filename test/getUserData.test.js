const { describe, it, expect } = require('@jest/globals')
const userController = require('./userController')

describe('userController', function() {})
describe('getUserParams', function() {
    it('should extract user params from request body', function() {
        const expected = {
            firstName : 'Jon' ,
            lastName: 'Tester',
            email: 'jon@tester.com',
            username: 'jonX' 
        }

        const body = { ... { a: 'b', c: 'd', ... expected} }
        expect(userController.getUserParams(body)).toStrictEqual(expected)
    }) 
    it('should return an empty body with an empty request', function() {
        const emptyBody = {}
        expect(userController.getUserParams(emptyBody)).toStrictEqual({})
        
    }) 
})