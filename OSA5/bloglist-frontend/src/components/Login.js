import React from 'react'
import Notification from '../components/Notification'
import propTypes from 'prop-types'

// ********************************************************************************
  // tapahtumakäsittelijä, joka vastaa loginsta
  // onChange vastaa siitä, että input-kentän arvo päivittyy esim. userName-tilaan
const Login = ({handleLogin, errorMessage, errorColor, username, setUsername, setPassword, password}) => { 
    
    return (
    
        <form onSubmit={handleLogin}>
        <h2>Login</h2>
        
        <Notification message={errorMessage} type={errorColor}/>
        
        <div>
            Username
            <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
        Password
            <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button id='login-button' type="submit"> Login </button>

        </form>
    )
}

Login.propTypes = {
    handleLogin: propTypes.func.isRequired,
    errorColor: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
    setUsername: propTypes.func.isRequired,
    setPassword: propTypes.func.isRequired,
    password: propTypes.string.isRequired
}

export default Login