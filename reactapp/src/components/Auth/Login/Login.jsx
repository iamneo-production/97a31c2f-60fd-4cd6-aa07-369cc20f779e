import React from 'react'
import { useState } from 'react'
import { Navigate,Link } from 'react-router-dom'
import authService from "../../../api/authService"


const Login = () => {

  const [FormData, setFormData] = useState({email: '', password: ''})

  const handleInputChange = (e) => { 
    const { name, value } = e.target
    setFormData({ ...FormData, [name]: value })
  }

  const handleLogin = async (e) => { 
    e.preventDefault()
    try {
      const data = await authService.login(FormData)
      console.log(data)
      localStorage.setItem('token', data.token)
    } catch (err) { 
      console.log(err)
    }
    setFormData({email: '', password: ''})
  }

  if (localStorage.getItem('token')) {
    return <Navigate to="/dashboard" />
}

  return (
    <form  onSubmit={handleLogin}>
        <div data-testid="loginBox">
            <label htmlFor="email">Email:</label>
            <input type="email" data-testid="email" name='email' value={FormData.email} onChange={handleInputChange} />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" data-testid="password" name="password" value={FormData.password} onChange={handleInputChange} />
        </div>
      
      <button type="submit" data-testid="loginButton">Submit</button>
      <br />
      Do'nt have an account? <Link to="/signup" data-testid="signupLink" >Signup</Link>

    </form>
  )
}

export default Login