const { MongoClient } = require('mongodb')

describe('insert', () => {
    let connection
    let db

    beforeAll(async () => {
        console.log(process.env.MONGO_URI)
        connection = await MongoClient.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        db = await connection.db()
    })

    afterAll(async () => {
        await connection.close()
    })

    it('should inser a doc into collection', async () => {
        const user = db.collection('user')

        const mockUser = { _id: 'some-user-id', name: 'Jon' }
        await user.insertOne(mockUser)

        const insertedUser = await user.findOne({_id: 'some-user-id'})
        expect(insertedUser).toEqual(mockUser)
    })
})