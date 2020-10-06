require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// .env -tiedostosta löytyy muuttujien arvot
const url = process.env.MONGODB_URI

console.log('connecting to', url)

// luodaan yhteys
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {console.log('connected to MongoDB')})
  .catch((error) => {
    console.log('error connesting to MongoDb', error.message)})

// tehdään skeema
const noteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, minlength: 8 } // hyvä olla String, muuten voi tulla bugeja
})

// validaatio - voidaan asettaa ehtoja skeemaan, kuten dublikaattien tallennuksen esto
noteSchema.plugin(uniqueValidator)

// poistetaan kannan palauttaman olion arvot: _id sekä __v ja muutetaan _id -> id
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// tehdään model. MongoDb luo aina "tietueet" monikossa collectionin eli "records"
module.exports = mongoose.model('Record', noteSchema)