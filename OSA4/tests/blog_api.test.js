const mongoose = require('mongoose')
const supertest = require('supertest')
const { response, post } = require('../app')
const app = require('../app')
const User = require('../models/user')

// yksittäinen testi voidaan käynnistää "npm test -- tests/blog_api.test.js",
// "npm test -- -t 'there are two blogs'" tai "npm test -- -t 'two'"

const api = supertest(app)

// Async- ja await ovat ES7:n mukanaan tuoma uusi syntaksi, joka mahdollistaa promisen 
// palauttavien asynkronisten funktioiden kutsumisen siten, että kirjoitettava koodi näyttää synkroniselta.
// Jotta voitaisiin kutsua operaatioita awaitin avulla, ensin on määriteltävä asyncs-funktio
// Ne korvaavat myös promissien .then-metodikutsut

/* ESIM: 
Note.find({})
  .then(notes => {
    return notes[0].remove()
  })

  VS.

const notes = await Note.find({})
*/

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    // toimiakseen .toHaveLength(3) numero muutettava 
    expect(response.body).toHaveLength(3)

})

test('POST-operation works fine', async () => {
  const newBlog =   {
    "title": "Up north",
    "author": "Santa Claus",
    "url": "www.auroraborealis.com",
    "likes": 101010101
  }

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

    const response = await api.get('/api/blogs')

    // toimiakseen .toHaveLength(7) numero muutettava 
    expect(response.body).toHaveLength(7)


})

// testataan validaatiot: username: required, lenght < 3, unique = true; password: required, lenght < 3
describe('VALIDATIONS', () => {

  test('POST-operation username OK', async () => {
    const start = await await User.find({})

    const newUser = {
      "username": "a",
      "name": "kimmo",
      "password": "secret"
  }
  
    await api 
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const end = await await User.find({})
      //console.log('START:', start.length + 1, 'END:', end.length);

      expect(end.length).toBe(start.length + 1)
  })

  test('POST-operation - password OK', async () => {

    const newUser = {
      "username": "wsaxoaioo",
      "name": "Juho",
      "password": "a"
  }
  
    await api 
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
  
  })
})

afterAll(() => {
  mongoose.connection.close()
})