import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../store/userContext';
import { useNavigate } from "react-router-dom";
import { login } from '../store/types';


function Login() {
  const {dispatch } = useContext(authContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      if (response.ok) {
        const res = await response.json();
        localStorage.setItem('user', JSON.stringify(res));
        dispatch({ type: login, payload: res });
        navigate('/login');
      } else {
        console.error('Error registering user');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  return (
    <div className="sign-up-container">
    <form onSubmit={handleSubmit} className="sign-up-form">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="sign-up-button">
       login
      </button>
      <Link to="/register" className="login-link">
        create an acount
      </Link>
    </form>
  </div>
  )
}


export default Login
