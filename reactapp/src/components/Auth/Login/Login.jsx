import React,{ useState } from 'react'
import { Navigate,Link } from 'react-router-dom'
import { store } from '../../../store'
import authService from '../../../api/authService'

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

  const [state, setState] = useState(initialState.inputs)
  const [errors, setErrors] = useState(initialState.errors)
  const [loader, setLoader] = useState(false)
  const { auth } = store.getState()  

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
          console.log(data,"data");
          if (data.status === 200) {
            store.dispatch({ type: 'LOGIN', payload: data })
            console.log(auth)
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

  
  if ( auth.token  ) {
    const role = auth.role
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" />
    } else {
      return <Navigate to="/Viewacademy"/>
    }
  }

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-blue-600 ">
              PG Admission Portal    
          </div>

          <div data-testid="loginBox" className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                      Sign in to your account
                  </h1>
                  <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" >

                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                          <input type="email" data-testid="email" name='email' value={state.email} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="email@gmail.com" />
                          { errors.email.required && <div className='text-red-500' >Email is required.</div>}
                      </div>

                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                          <input type="password" data-testid="password" name="password" value={state.password} onChange={handleInputChange}   placeholder="••••••••" autoComplete="current-password"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                          { errors.password.required && <div className='text-red-500' >Password is required.</div>}
                      </div>

                      { errors.custom.required && <div className='text-red-500' >{ errors.custom.message }</div>}

                      <button type="submit" data-testid="loginButton" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                      { loader && <div className="loader mr-auto ml-auto "></div>}

                      <p className="text-sm font-light text-gray-500 ">
                          Don’t have an account yet? <Link to="/signup" className='text-blue-800 font-semibold'  data-testid="signupLink" >Signup</Link>
                      </p>

                  </form>
              </div>
          </div>
      </div>
    </section>

  )
}

export default Login