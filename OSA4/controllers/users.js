const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// käyttäjien luonti. Salasanat hashataan bcrypt:lla

// GET
usersRouter.get('/', async (request, responce) => {
    const allUsers = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})

    responce.json(allUsers)
})

// POST
usersRouter.post('/', async (request, response) => {
  const body = request.body

  // salasana on hyvä tarkistaa tässä, kontrollerissa eikä mongoose-unique-validator:lla, koska bäkkärissä ja kannassa on eri salasanat hashauksen takia
  const kayttis = body.username
  const sala = body.password

  // tarkistetaan, että username ja password täyttää validoinnin
  if (kayttis.length < 3 ||kayttis === undefined) {
    return response.status(400).json({error: 'username is undefined or less than 3 characters'})
    }

  else if (sala.length < 3 || sala === undefined) {
    return response.status(400).json({error: 'password is not typed either it less than 3 characters'})
    }

  else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    // TODO tähän pitäisi laittaa concat juttu, jotta saataisiin userin tiedot näkyville blogiin

    // tämä on sama kuin promisen palauttama .then metodikutsu
    const savedUser = await user.save()

    response.json(savedUser)
    }
})

module.exports = usersRouter