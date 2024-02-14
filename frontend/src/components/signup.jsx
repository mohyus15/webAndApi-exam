import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sign_up } from "../api/api";
import { authContext } from '../store/userContext';
import { register } from "../store/types";

const SignUp = () => {
  const { dispatch } = useContext(authContext);
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
    <div style={{
      maxWidth: "400px",
      margin: "auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      marginTop: "200px"
    }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={{ fontWeight: "bold", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
        <button type="submit" style={{ backgroundColor: "#4caf50", color: "#fff", padding: "10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Sign Up</button>
        <Link to="/login" style={{ marginTop: "10px", textAlign: "center", textDecoration: "none", color: "#007bff", display: "block" }}>register if you have an account</Link>
      </form>
    </div>
  );
};

export default SignUp;
