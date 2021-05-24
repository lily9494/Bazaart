const { MongoClient } = require('mongodb')
const uri = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? '//localhost:27017/bazaart_test"' : 'mongodb://localhost:27017/bazaart"');

describe('insert', () => {
  let connection
  let db

  beforeAll(async () => {
    console.log(process.env.MONGO_URL)
    connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should insert a doc into collection', async () => {
    const users = db.collection('User')

    const mockUser = { _id: 'some-user-id', name: 'John' }
    await users.insertOne(mockUser)

    const insertedUser = await users.findOne({ _id: 'some-user-id' })
    expect(insertedUser).toEqual(mockUser)
  })
})