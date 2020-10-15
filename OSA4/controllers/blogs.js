const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// getin parametrina voi olla pelkkä "/" eikä "/api/blogs" koska app.js:ssa
// tulee määrittely app.use('/api/notes', blogsRouter)

// GET
blogsRouter.get('/', async (request, response) => {

  // Mongoosen populate-funktion toiminnallisuus perustuu siihen, 
  // että olemme määritelleet viitteiden "tyypit" olioiden Mongoose-skeemaan ref-kentän avulla:
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)

})

// Apufunktio getTokenFrom eristää tokenin headerista authorization
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
  
// POST
// async ja awaitista enemmän blog_api.test.js
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    //console.log('BODY:', body);

    // Tokenin oikeellisuus varmistetaan metodilla jwt.verify
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    // haetaan tietokannasta käyttäjä request userId:n avulla - ilman tokeneita
    //const user = await User.findById(body.userId)

    // tehdään muutoksia uuteen blogiin ja lisätään UserId sinne
    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes,
      user: body.userId
  })
  
  // tallennetaan muokattu blogi-objekti (jossa on käyttäjän id (rivi 24))
  const savedBlog = await blog.save()

  // lisätään responsena saatu lisääjän id käyttäjän kokoelmaan
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
    
  response.json(savedBlog)
})

// DELETE
blogsRouter.delete('/:id', async (request, response) => {

  await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    //.catch(error => next(error))
})

// PUT
blogsRouter.put('/:id', async (request, response) => {

  const upDated = {
    "title": "Putin",
    "author": "Trump",
    "url": "www.updated.com",
    "likes": 1111111
  }

  await Blog.findByIdAndUpdate(request.params.id, upDated)

    response.json(await Blog.find({}))

    //.catch(error => next(error))
})

module.exports = blogsRouter