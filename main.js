
const app = require('./app')

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? '//localhost:27017/bazaart_test"' :  "mongodb://localhost:27017/bazaart" )
const mongoose = require("mongoose")

mongoose.connect(uri, { useNewUrlParser: true,
});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'conection error'))
db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose')

})

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`)
})


