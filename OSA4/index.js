const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// yksinkertainen blogi-sovellus, joka tallentaa tiedot tietokantaan ja hakee ne sieltä.
// Voidaan testata backendin tomivuuttaa kannan kanssa

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// 4.1 - 4.2
// 4.3 - 4.5
// 4.8
// 4.9 - 4.10
// 4.13 - 4.14
// 4.15 - 4.19