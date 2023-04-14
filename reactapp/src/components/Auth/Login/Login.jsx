import React from 'react'
import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
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
      email: { required: false },
      password: { required: false },
      custom: null,
    },
    loading: false,
    success: false,
  };
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(null)
  const dispatch = useDispatch();

  const handleInputChange = (e) => { 
    const { name, value } = e.target
    setState({...state, inputs: {...state.inputs, [name]: value} })
  }

  const handleLogin = async (e) => { 
    e.preventDefault()
    let hasError = false;
    let errors = initialState.errors;
    if (state.inputs.email === '') {
      errors = {
          ...errors,
          email: { required: true },
      };
      hasError = true;
  }
  if (state.inputs.password === '') {
      errors = {
          ...errors,
          password: { required: true },
      };
      hasError = true;
    }
    
    setState({
      ...state,
      errors: errors,
    });

    if (!hasError) {
      authService.login(state.inputs)
        .then((data) => {
          console.log(data,"data");
          if (data.status === 200) {
            dispatch(setToken({ token: data.token,role:data.roles[0] }))
            localStorage.setItem( 'token', data.token)
            localStorage.setItem( 'role', data.roles[0])
            setState({ ...state, success: true })
            setState(initialState)
          } else {
            setErrors(data.message)
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
            <input type="email" data-testid="email" name='email' value={state.inputs.email} placeholder="Enter Email" onChange={handleInputChange}  />
        </div>
        {state.errors.email.required && <div className='text-danger' >Email is required.</div>}
      
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" data-testid="password" name="password" value={state.inputs.password}  placeholder="Enter Password" onChange={handleInputChange}  />
        </div>
        {state.errors.password.required && <div className='text-danger' >Password is required.</div>}
      
      { errors && <div className='text-danger' >{errors}</div>}
      <button type="submit" data-testid="loginButton">Submit</button>
      <br />
      Don't have an account? <Link to="/signup" data-testid="signupLink" >Signup</Link>

    </form>
  )
}

export default Login
