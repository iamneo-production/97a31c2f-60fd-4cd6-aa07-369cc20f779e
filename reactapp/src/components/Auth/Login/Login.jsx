import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { store } from '../../../store'
import authService from '../../../api/authService'
import './Login.css'

const Login = () => {

  const initialState = {
    inputs: {
      email: '',
      password: '',
    },
    errors: {
      hasError: false,
      email: { required: false },
      password: { required: false },
      custom: { required: false, message: '' },
    },
  };

  const [state, setState] = useState(initialState.inputs)
  const [errors, setErrors] = useState(initialState.errors)
  const [loader, setLoader] = useState(false)
  const { auth } = store.getState()
  const navigate = useNavigate();

  // Function to handle input change event
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  // Function to handle form submit event
  const handleLogin = async (e) => {
    e.preventDefault()

    let error = initialState.errors;

    // Validation for Email field
    if (state.email === '') {
      error = {
        ...error,
        email: { required: true },
      };
      error.hasError = true;
    }

    // Validation for Password field
    if (state.password === '') {
      error = {
        ...error,
        password: { required: true },
      };
      error.hasError = true;
    }

    // Setting errors in state
    setErrors(error)

    // Calling login function
    if (!error.hasError) {
      setLoader(true)
      authService.login(state)
        .then((data) => {
          console.log(data, "data");
          if (data.status === 200) {
            store.dispatch({ type: 'LOGIN', payload: data })
            setLoader(false)
          } else {
            setErrors({ ...errors, custom: { required: true, message: data.message } })
            setLoader(false)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }


  if (auth.token) {
    const role = auth.role
    if (role === 'ADMIN') {
      return <Navigate to="/Firstpage" />
    } else {
      return <Navigate to="/Navpage" />
    }
  }

  return (
    <>
    <div data-testid="loginBox" className='whole1'>
      <div className="head1">
      <h1>PG ADMISSION</h1>
      </div>
      <form onSubmit={handleLogin} class="box" >
        <h1>LOGIN NOW!</h1>
        
        <div>
          
          <input type="email" data-testid="email" id="email" name='email' value={state.email} onChange={handleInputChange}  placeholder="Email" />
          {errors.email.required && <div className='text-red-500' >Email is required.</div>}
        </div>

        <div>
          <input type="password" data-testid="password" id="password" name="password" value={state.password} onChange={handleInputChange} placeholder="Password" autoComplete="current-password"  />
          {errors.password.required && <div className='text-red-500' >Password is required.</div>}
        </div>

        {errors.custom.required && <div className='text-red-500' >{errors.custom.message}</div>}

        <button type="submit" id="loginButton" data-testid="loginButton" className="lbtn">Sign in</button>
        {loader && <div className="loader mr-auto ml-auto "></div>}

        <p className="plgn ">
          Don’t have an account yet? <Link to="/signup" data-testid="signupLink" id="signupLink" onClick={() => setTimeout(() => { navigate("/signup") }, 500)} ><h3>Signup</h3></Link>
        </p>
        
      </form>
    </div>
    </>


  )
}

export default Login