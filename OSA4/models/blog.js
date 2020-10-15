const mongoose = require('mongoose')

// määritellään skeema
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
  
    // tällä tehdään viitteitä Mongon kokoelmien välillä
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

// positetaan _id ja __v sekä muutetaan _id -->id
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Blog', blogSchema)