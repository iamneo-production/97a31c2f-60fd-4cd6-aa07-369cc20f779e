import React,{ useState } from 'react'
import authService from "../../../api/authService"
import { Link,Navigate } from 'react-router-dom'

const Signup = () => {
    const[redirect, setRedirect] = useState(false)
    
    const initialState = {
        email: '',
        mobileNumber: '',
        password: '',
        username: '',
        userType: 'user',
        confirmPassword: ''
    }
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => { 
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => { 
        e.preventDefault()
        try {
            const data = await authService.register(formData)
            console.log(data);
            setRedirect(true)
        }catch(err){
            console.log(err)
        }
    }

    return (
    <form onSubmit={handleSubmit}>
            
        <div>
            <label htmlFor="userType">User Type:</label>
            <select data-testid="userType" name="userType" value={formData.userRole} onChange={handleInputChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </div>
        
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" data-testid="email" name='email' value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" data-testid="username" name='username' value={formData.username} onChange={handleInputChange} />
        </div>
        <div>
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input type="text" data-testid="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" data-testid="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" data-testid="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
        </div>
                
            <button type="submit" data-testid="submitButton">Submit</button>
            <br />
            Allready a user? <Link to="/login" data-testid='signinLink'>signup</Link>
            {redirect && <Navigate to="/login" />}
    </form>
  )
}

export default Signup