import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../store/userContext';
import { useNavigate } from "react-router-dom";
import { login } from '../store/types';

function Login() {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
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
    <div style={{
      maxWidth: "400px",
      margin: "auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      marginTop: "200px"
    }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }} className="sign-up-form">
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ fontWeight: "bold", marginBottom: "5px" }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px"
            }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ fontWeight: "bold", marginBottom: "5px" }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px"
            }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: "#4caf50", color: "#fff", padding: "10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Login</button>
        <Link to="/signup" style={{ marginTop: "10px", textAlign: "center", textDecoration: "none", color: "#007bff", display: "block" }}>Create an account</Link>
      </form>
    </div>
  );
}

export default Login;
