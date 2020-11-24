import React, {useState} from 'react'
import Notification from './Notification'
import blogService from '../services/blogs'

// HUOM! input-kentissä luodaan uusi objekti. ...newBlog-notaatio tarkoittaa, että se kopioi ensin kaikki objektin
  // olemassa olevat tiedot ja sitten ylikirjoittaa pilkun jälkeen tulevan key:value parin.
  // Jos ...newBlog ei ole, häviää objektin kaikki muut kentät
  // value={newBlog.title || ""} <---- || "" on sitä varten, että inputti tyhjenee napin painauksesta
  const BlogForm = ({errorMessage, errorColor, blogs, setBlogs, setErrorColor, setErrorMessage}) => {

    // tämä tila siirretty App.js:sta, koska App ei sitä tarvitse
  const [newBlog, setNewBlog] = useState({title: '', author: '', url:'', likes: '0'}) // määritellään uusi blogiobjekti

  // uuden blogin lisäys
  const addBlog = (event) => {
    event.preventDefault()
    //console.log('New Blog:', newBlog);

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        //console.log('RETURNED BLOG --> ', returnedBlog); // tässä voi katsoa, mikä on palvelimen responce
        setNewBlog({title: '', author: '', url:'', likes: '0'}) // alustus piti tehdä tässäkin, koska blogin lisäyksen jälkeen "likes" ei toiminut
        setErrorColor('ok') // ok viittaa vihreään väriin, katso ---> Notification.js
        setErrorMessage(`${newBlog.title} by ${newBlog.author} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }
      return(
    <div>

    <Notification message={errorMessage} type={errorColor}/>

      <form onSubmit={addBlog}>
        <h2>Create new blog</h2>
        
        Title: <input 
                id='inputTitle'
                type='text' 
                name="title"
                value={newBlog.title || ""}
                onChange={({ target }) => setNewBlog({
                  ...newBlog,
                  [target.name]: target.value
              })} 
              /> <br/>

        Author: <input 
                id='inputAuthor'
                type='text' 
                name="author"
                value={newBlog.author || ""}
                onChange={({ target }) => setNewBlog({
                  ...newBlog,
                  [target.name]: target.value
              })} 
              /> <br/>

        URL: <input 
                id='inputUrl'
                type='text' 
                name="url"
                value={newBlog.url || ""}
                onChange={({ target }) => setNewBlog({
                  ...newBlog,
                  [target.name]: target.value
              })} 
              /> <br/>
              
        <button id='createNewBlogButton' type="submit"> Create new blog </button> <br/> <br/>

      </form>
    </div>
  )
}

export default BlogForm