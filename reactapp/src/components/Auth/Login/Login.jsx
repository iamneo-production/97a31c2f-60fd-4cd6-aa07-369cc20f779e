import React from 'react'
import { useState } from 'react'
import { Navigate,Link } from 'react-router-dom'
import authService from "../../../api/authService"
import "./Login.css"
import { useDispatch } from 'react-redux'
import { setToken } from '../../../features/auth/authSlice'

const Login = () => {

  const initialState = {
    inputs: {
      email: '',
      password: '',
    },
    errors: {
      hasError:false,
      email: { required: false },
      password: { required: false },
      custom: { required: false, message: '' },
    },
  };
  const [state, setState] = useState(initialState.inputs);
  const [errors, setErrors] = useState(initialState.errors)
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch();

  const handleInputChange = (e) => { 
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleLogin = async (e) => { 
    e.preventDefault()

    let errors = initialState.errors;
    if (state.email === '') {
      errors = {
          ...errors,
          email: { required: true },
      };
      errors.hasError = true;
  }
  if (state.password === '') {
      errors = {
          ...errors,
          password: { required: true },
      };
      errors.hasError = true;
    }
    
    setErrors(errors)

    if (!errors.hasError) {
      setLoader(true)
      authService.login(state)
        .then((data) => {
          console.log(data,"data");
          if (data.status === 200) {
            dispatch(setToken({ token: data.token,role:data.roles[0] }))
            localStorage.setItem('token', data.token)
            localStorage.setItem('role', data.roles[0])
            setLoader(false)
          } else {
            setErrors({ ...errors, custom: { required: true, message: data.message } })
            setLoader(false)
          }
        })
    }
  }

  if (localStorage.getItem('token')) {
    const role = localStorage.getItem('role')
    console.log(localStorage)
    if (role === 'Admin') {
      return <Navigate to="/admin/dashboard" />
    } else {
      return <Navigate to="/user/dashboard" />
    }
  }

  return (
    <form onSubmit={handleLogin}>
      
        <div data-testid="loginBox">
            <label htmlFor="email">Email:</label>
            <input type="email" data-testid="email" name='email' value={state.email} placeholder="Enter Email" onChange={handleInputChange}  />
        </div>
        { errors.email.required && <div className='text-danger' >Email is required.</div>}
      
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" data-testid="password" name="password" value={state.password}  placeholder="Enter Password" onChange={handleInputChange}  />
        </div>
        { errors.password.required && <div className='text-danger' >Password is required.</div>}
      
      { errors.custom.required && <div className='text-danger' >{ errors.custom.message }</div>}
      { loader && <div className="loader"></div>}
      <button type="submit" data-testid="loginButton">Submit</button>
      <br />
      Don't have an account? <Link to="/signup" data-testid="signupLink" >Signup</Link>

    </form>
  )
}

export default Login