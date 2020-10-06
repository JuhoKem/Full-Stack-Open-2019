const mongoose = require('mongoose')

// tällä tiedostolla luodaan toimiva vuorovaikutus tietokannan ja ohjelman välillä,
// minkä jälkeen toimiva koodi upotetaan backendiin

// ohjelma käynistetään node mongo.js *salasana* *nimi* *numero*
// jos nimessä tai numerossa on välilyönti, niin silloin nimi tulee hipsuihin – 'Aku Ankka'

// MongoDb:ssa ei ole pakko luoda tietokantaa hallintanäkymässä, se voi tehdä sen automaattisesti

if (process.argv.length<3) {
  console.log('give at least password as argument')
  process.exit(1)
}
// ympäristömuuttujat
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
//console.log('process is:', password);

// url saa, kun luodaan klusteri mongo Atlaksessa
const url =
  `mongodb+srv://ptz_:${password}@cluster0.utgqg.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// tehdään skeema
const noteSchema = new mongoose.Schema({
  name: String,
  number: Number
})

// tehdään model. MongoDb luo aina "tietueet" monikossa collectionin eli "records"
const Record = mongoose.model('Record', noteSchema)

// luodaan uusi muistiinpano
const record = new Record({
  name: name,
  number: number
})

// toimiakseen ehtolauseen pitää olla schema ja model luomisen jälkeen
if (process.argv.length<4) {
  Record.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(record => {
      console.log( record.name, record.number)
    })
    mongoose.connection.close()
  })
}
else {
// MongoDb tallentaa
  record.save().then(response => {
    console.log('added', response.name, 'number', response.number, 'to phonebook')
    mongoose.connection.close()
  })
}

// 3.12