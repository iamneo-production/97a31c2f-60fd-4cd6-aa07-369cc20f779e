// import React from 'react'
// import { useState } from 'react'
// import { Navigate,Link } from 'react-router-dom'
// import authService from "../../../api/authService"
// import "./Login.css"

// const Login = () => {

//   const [FormData, setFormData] = useState({email: '', password: ''})

//   const handleInputChange = (e) => { 
//     const { name, value } = e.target
//     setFormData({ ...FormData, [name]: value })
//   }

//   const handleLogin = async (e) => { 
//     e.preventDefault()
//     try {
//       const data = await authService.login(FormData)
//       console.log(data)
//       localStorage.setItem('token', data.token)
//     } catch (err) { 
//       console.log(err)
//     }
//     setFormData({email: '', password: ''})
//   }

//   if (localStorage.getItem('token')) {
//     return <Navigate to="/dashboard" />
// }

//   return (
//     <form  onSubmit={handleLogin}>
//         <div data-testid="loginBox">
//             <label htmlFor="email">Email:</label>
//             <input type="email" data-testid="email" name='email' value={FormData.email} placeholder="Enter Email" onChange={handleInputChange} required />
//         </div>
//         <div>
//             <label htmlFor="password">Password:</label>
//             <input type="password" data-testid="password" name="password" value={FormData.password}  placeholder="Enter Password" onChange={handleInputChange} required />
//         </div>
      
//       <button type="submit" data-testid="loginButton">Submit</button>
//       <br />
//       Don't have an account? <Link to="/signup" data-testid="signupLink" >Signup</Link>

//     </form>
//   )
// }

// export default Login



import React from 'react'
import { useState } from 'react'
import { Navigate,Link } from 'react-router-dom'
import authService from "../../../api/authService"
import "./Login.css"
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
      if (data.success) {

      localStorage.setItem('token', data.token)
    } else {
      throw new Error(data.message); // throw an error if login fails
    } }
    catch (err) { 
      console.log(err)
      alert(err.message);
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
            <input type="email" data-testid="email" name='email' value={FormData.email} placeholder="Enter Email" onChange={handleInputChange} required />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" data-testid="password" name="password" value={FormData.password}  placeholder="Enter Password" onChange={handleInputChange} required />
        </div>
      
      <button type="submit" data-testid="loginButton">Submit</button>
      <br />
      Don't have an account? <Link to="/signup" data-testid="signupLink" >Signup</Link>

    </form>
  )
}


export default Login