import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Login from './components/Login'

// käynnistys nps start OSA5/bloglist-frontend/ -kansiossa

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) // sisältää onnistuneesti kirjautuneen käyttäjän tiedot ja token
  const [errorMessage, setErrorMessage] = useState(null)  // välittää viestin --> notification.js
  const [errorColor, setErrorColor] = useState('')        // välittää värin --> notification.js
  const [blogVisible, setBlogVisible] = useState(false)

  const sortedBlogs = [...blogs.sort((a, b) => a.likes - b.likes).reverse()] // järjestetään blogit suurusjärjestyksessä likejen määrän perusteella

  // By using this Hook, you tell React that your component needs to do something after render
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // tämä on tehty, jotta selain muistaisi kirjautumisen, eikä logouttaisi sivun päivityksen yhteydessä
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    //console.log("loggedUserJSON --->>", loggedUserJSON)

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // tapahtumakäsittelijä loginille
  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password);

    
    try {
      const user = await loginService.login({
        username, password,
    })
    //console.log('USER INFO: ---> ', user)

      // tallentaa local storageen sisääkirjautuneen käyttäjän tiedot, kuten token, käyttäjätunnus, nimi jne..
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        setErrorMessage("Wrong username or password")
        setErrorColor('not ok')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
  }

  // uloskirjautumisen tapahtumakäsittelijä --> pyyhitään "local storage" tokenista
  const logoutHandle = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // tapahtumakäsittelijä, joka vastaa blogi formin näkyvyydestä
  const blogForm = () => {

    const hideWhenVisible = { display: blogVisible ? 'none' : ''}
    const showWhenVisible = { display: blogVisible ? '' : 'none'}

    return(
      <div>
        <div style={hideWhenVisible}>
          <button id='newBlogButton' onClick={() => setBlogVisible(true)}> New blog </button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm errorMessage={errorMessage} errorColor={errorColor} blogs={blogs}
                    setBlogs={setBlogs} setErrorColor={setErrorColor} setErrorMessage={setErrorMessage}/>

          <button onClick={() => setBlogVisible(false)}> Hide </button>
        </div>
        {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user}/> )}
      </div>
    )
      
  }
 
  return (
    <div>
      { user === null ?
         <Login password={password} handleLogin={handleLogin} errorMessage={errorMessage} errorColor={errorColor} username={username} setUsername={setUsername} setPassword={setPassword}/> :
        <div>
          <h2> Blogs </h2>
          <p> {user.name} logged in <button onClick={logoutHandle}> Logout </button> </p>
          {blogForm()} 
        </div>
      }
    </div>
  )
}

export default App

// 5.1 - 5.4
// 5.5 - 5.10
// 5.11 - 5.12
// 5.13 - 5.15
// 5.17 - 5.22