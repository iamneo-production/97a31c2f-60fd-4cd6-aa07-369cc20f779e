import React,{ useState } from 'react'
import authService from "../../../api/authService"
import { Link,Navigate } from 'react-router-dom'
import "./Signup.css"
import Validation from './Validation'

const Signup = () => {

    const initialState = {
        form: {
            email: '',
            mobileNumber: '',
            password: '',
            username: '',
            userType: 'User',
            confirmPassword: ''
        },
        errors: {
            hasError: false,
            email: { required: false, message: '' },
            password: { required: false, message: '' },
            username: { required: false, message: '' },
            mobileNumber: { required: false, message: '' },
            confirmPassword: { required: false, message: '' },
            custom: { required: false, message: '' },
        }
    }
    const [formData, setFormData] = useState(initialState.form);
    const [errors, setErrors] = useState(initialState.errors)
    const [loader, setLoader] = useState(false)
    const[redirect, setRedirect] = useState(false)
    

    const handleInputChange = (e) => { 
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => { 
        e.preventDefault()
        let errorObj = initialState.errors;
        errorObj = Validation(formData, errorObj)
        setErrors(errorObj)
        if (!errorObj.hasError) {
            setLoader(true)
            authService.register(formData)
                .then((data) => { 
                    console.log(data, "data");
                    if (data.id) {
                        setRedirect(true)
                        setLoader(false)
                    }
                    else {
                        errorObj.custom.required = true
                        errorObj.custom.message = data.message
                        setLoader(false)
                    }
                })
        }
    }

    return (
    <form onSubmit={handleSubmit}>
            
        <div>
            <label htmlFor="userType">User Type:</label>
            <select data-testid="userType" name="userType" value={formData.userRole} onChange={handleInputChange}>
                <option value="user" >User</option>
                <option value="admin">Admin</option>
            </select>
        </div>
        
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" data-testid="email" name='email' value={formData.email} placeholder="Enter Email" onChange={handleInputChange} />
        </div>
            {errors.email.required && <div className="error">{errors.email.message}</div>}
            
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" data-testid="username" name='username' value={formData.username} placeholder="Enter User Name" onChange={handleInputChange} />
        </div>
            {errors.username.required && <div className="error">{ errors.username.message }</div>}
            
        <div>
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input type="text" data-testid="mobileNumber" name="mobileNumber" value={formData.mobileNumber} placeholder="Enter phoneNumber" onChange={handleInputChange} />
        </div>
            {errors.mobileNumber.required && <div className="error">{ errors.mobileNumber.message }</div>}    
        
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" data-testid="password" name="password" value={formData.password} placeholder="Enter Password" onChange={handleInputChange} />
        </div>
            {errors.password.required && <div className="error">{ errors.password.message }</div>}    
            
        <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" data-testid="confirmPassword" name="confirmPassword" value={formData.confirmPassword}  placeholder="Enter Confirm Password" onChange={handleInputChange} />
        </div>
            {errors.confirmPassword.required && <div className="error">{ errors.confirmPassword.message }</div>}

            {loader && <div className="loader"></div>}
            {errors.custom.required && <div className="error">{errors.custom.message}</div>}
            <button type="submit" data-testid="submitButton">Submit</button>
            <br />
            All Ready a user? <Link to="/login" data-testid='signinLink'>Login</Link>
            {redirect && <Navigate to="/login" />}
    </form>
  )
}

export default Signup