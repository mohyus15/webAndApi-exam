import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sign_up } from "../api/api";
import { authContext } from '../store/userContext';
import { register } from "../store/types";
import "./signup.css";


const SignUp = () => {
  const {dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(sign_up, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      if (response.ok) {
        const res = await response.json();
        localStorage.setItem('user', JSON.stringify(res));
        dispatch({ type: register, payload: res });
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
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
          Sign Up
        </button>
        <Link to="/login" className="login-link">
          registerif you have an account
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
