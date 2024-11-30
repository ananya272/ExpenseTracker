import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'; // Custom CSS for styling

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }
    try {
      const url = `${APIUrl}/auth/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
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
    <div className='signup-container'>
      <div className='signup-card'>
        <h1 className='signup-title'>Create Your Account</h1>
        <form onSubmit={handleSignup} className='signup-form'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              onChange={handleChange}
              type='text'
              name='name'
              placeholder='Enter your name'
              value={signupInfo.name}
              className='form-control'
              autoFocus
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              onChange={handleChange}
              type='email'
              name='email'
              placeholder='Enter your email'
              value={signupInfo.email}
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
              value={signupInfo.password}
              className='form-control'
            />
          </div>
          <button type='submit' className='btn-signup'>
            Sign Up
          </button>
          <div className='login-link'>
            Already have an account? <Link to='/login'>Login</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
