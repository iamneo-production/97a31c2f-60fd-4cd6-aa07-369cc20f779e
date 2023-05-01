import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { UseLogin } from '../../../hooks/UseLogin'
import "./Login.css"

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
  // Calling UseLogin hook
  const {login,loader,customError} = UseLogin()

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
    if (!errors.hasError) {
        login(state)
    }
  }

  return (
    <form  className="Form" onSubmit={handleLogin}>
      
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
      
      { customError && <div className='text-danger' >{ customError }</div>}
      { loader && <div className="loader"></div>}
      <button type="submit" data-testid="loginButton">Submit</button>
      <br />
      Don't have an account? <Link to="/signup" data-testid="signupLink" >Signup</Link>

    </form>
  )
}

export default Login