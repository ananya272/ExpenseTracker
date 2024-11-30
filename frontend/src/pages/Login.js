import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Custom CSS for styling

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }
    try {
      const url = `${APIUrl}/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        handleError(error.details[0].message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h1 className='login-title'>Welcome Back! To Expense Tracker</h1>
        <form onSubmit={handleLogin} className='login-form'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              onChange={handleChange}
              type='email'
              name='email'
              placeholder='Enter your email'
              value={loginInfo.email}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              onChange={handleChange}
              type='password'
              name='password'
              placeholder='Enter your password'
              value={loginInfo.password}
              className='form-control'
            />
          </div>
          <button type='submit' className='btn-login'>
            Login
          </button>
          <div className='signup-link'>
            Don't have an account? <Link to='/signup'>Sign Up</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
