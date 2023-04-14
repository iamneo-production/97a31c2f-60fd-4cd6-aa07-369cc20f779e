import React, { useState } from 'react';
import authService from '../../../api/authService';
import { Link, Navigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [redirect, setRedirect] = useState(false);
  const initialState = {
    email: '',
    mobileNumber: '',
    password: '',
    username: '',
    userType: 'User',
    confirmPassword: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError('Confirm password is wrong');
      return;
    }
    try {
      console.log(formData);
      const data = await authService.register(formData);
      console.log(data);
      if (data.status === 200) setRedirect(true);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div>
        <label htmlFor="userType">User Type:</label>
        <select
          data-testid="userType"
          name="userType"
          value={formData.userRole}
          onChange={handleInputChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          data-testid="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          data-testid="username"
          name="username"
          value={formData.username}
          placeholder="User Name"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="text"
          data-testid="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          placeholder="Mobile Number"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          data-testid="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          data-testid="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" data-testid="submitButton">
        Submit
      </button>
      <br />
      Already a User?{' '}
      <Link to="/login" data-testid="signinLink">
        Login
      </Link>
      {redirect && <Navigate to="/login" />}
    </form>
  );
};

export default Signup;
