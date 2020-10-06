// Node ja Express-kirjasto
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Record = require('./models/recordSave')

// npm init
// npm install express --save
// npm install --save-dev nodemon - kehitysaikainen tiedoston päivitys
// Same origin policy onglema tulee etee. Asenettava "npm install cors" backendiin
// jos haluaa herokun toimivan tietokannan kanssa, pitää tehdä komentorivillä komento
// heroku config:set MONGODB_URI=mongodb+srv://ptz_:310385@cluster0.utgqg.mongodb.net/phonebook?retryWrites=true&w=majority
// komennolla "heroku config:get MONGODB_URI" voi tarkistaa konfiguraation

// sallii porttien 3000 ja 3001 kommunikointia keskenään. "Same origin policy"
app.use(cors())

// json-parseri. Tällä päästään requestin mukana tulleeseen dataan käsiksi
app.use(express.json())

// tällä saadaan loggaus ulos terminaalissa. Näkee, mitä pyyntojä on tehty
app.use(morgan('tiny'))

// frontend tuotantoversion staattisen sisällön käyttäminen backendissa
// eli kopioitiin "build"-kansio frontista backendin juureen ja otettiin se käyttöön.
// tällä tarkistetaan, että front ja back toimii hyvin paikallisesti eli omalla koneella
app.use(express.static('build'))

// jos haluaa muokata taulukkoa, niin pitää olla "let"
// tässä oli let persons = [ {name: adfs, number: 12312, id: 1}, {name: adfs, number: 12312, id: 2}]

// GET - kaikki data. Tehty mongoosea käyttäen
app.get('/api/persons', (req, res, next) => {
  Record.find({}).then(results => {
    res.json(results.map(r => r.toJSON()))
  })
    .catch(error => next(error))
// mongoose.connection.close() <-- tarvitaanko tätä?
})

// GET - info sivu
app.get('/info', (req, res, next) => {
  Record
    .countDocuments()
    .then(results => {
      res.send(`<p>Phonebook has info for <strong> ${results} </strong> people</p> ${new Date()}`)})
    .catch(error => next(error))

})

// GET - yksittäinen ID
// jos on virheidenkäsittelijä, joka siirttä sen eteenpäin, niin pitää olla next-parametri
app.get('/api/persons/:id', (req, res, next) => {
  Record.findById(req.params.id)
    .then(record => {
      if (record) {
        res.json(record.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

//DELETE - poisto ID:n perusteella  --> kun testataan poisto, niin syötetään URl:iin MongoDb:n id
app.delete('/api/persons/:id', (req, res, next) => {
  Record.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))

})
/*
// generoi ID:n
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}
*/

// POST - uuden tietueen lisäys
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  console.log(body)

  if (body.name === undefined) {
    // returnin on oltava, muuten koodi jatkaa suoritusta loppuun asti
    return res.status(400).json({ error : 'content missing' })
  }

  // luodaan uusi muistiinpano
  const newRecord = new Record({
    name: body.name,
    number: body.number
    //id: generateId()
  })
  newRecord.save()
    .then(savedRecord => savedRecord.toJSON())
    .then(savedRecord => {
      res.json(savedRecord)
    })
    .catch(error => next(error))
})

// **************** Middleware - jos käyttäjä eksyy olemattomalle sivulle ******************
const unknownEndpoint = (request, response) => {
  response.status(404).send(
    '<h1>Here is nothing</h1> <a href="https://puhluet.herokuapp.com/api/persons">Try this</a>')
}
// on tärkeää, että middleware otetaan käyttöön tietyissä paikkoissa
app.use(unknownEndpoint)

// **************** Virheenkäsittelijä - siirtää kaikki virheet next()-funktiolla *********
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(409).send({ error: 'The name you tried to add is already exist. Give another one.' })
  }

  next(error)
}
app.use(errorHandler)
// **************************************************************************************

// kuuntelijan pitää kuunella porttia aina, jotta backend osaisi vastata pyyntöihin
// process.env.PORT on ympäristömuuttuja, joka on .env-tiedostossa ja jonka Heroku määrittää itse,
// ja luo yhteyden sitä kautta
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// 3.1 - 3.6
// 3.7
// 3.9 - 3.11
// 3.12
// 3.13 - 3.14
// 3.15, 3.16, 3.18
// 3.19 - 3.21
// 3.22