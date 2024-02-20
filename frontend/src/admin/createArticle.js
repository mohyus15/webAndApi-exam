import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { authContext } from '../store/userContext';
import { articleContext } from '../store/ArticleContextProvider';
import {CREATE_ARTICLE } from '../store/types';
function CreateArticle() {
  const { user } = useContext(authContext);
  const { dispatch } = useContext(articleContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [article, setArticle] = useState({
    title: '',
    image: '',
    text: '',
    name: '',
  });

  useEffect(() => {
    const socket = io('http://localhost:8900', {
      transports: ['websocket', 'polling'],
    });
    socket.on('connect', () => {
      console.log('Socket connected');
    });
    socket.on('articleCreated', () => {
      alert('New article created');
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: CREATE_ARTICLE, payload: data });
        navigate('/');
        const socket = io('http://localhost:8900', {
          transports: ['websocket', 'polling'],
        });
        socket.emit('createNewArticle');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto',   backgroundColor: 'rgba(100, 100, 100, 0.2)', borderRadius: '5%', padding: '100px', marginTop: '30px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Article</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Enter title..."
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="image" style={{ display: 'block', marginBottom: '5px' }}>Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={article.image}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Enter image URL..."
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="text" style={{ display: 'block', marginBottom: '5px' }}>Text:</label>
          <textarea
            id="text"
            name="text"
            value={article.text}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Enter text..."
            rows="6"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
  type="text"
  id="name"
  name="name"
  value={article.name}
  onChange={handleChange}
  style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
  placeholder="Enter name (optional)..."
/>




        </div>
        {error && <div style={{ marginBottom: '15px', color: 'red' }}>{error}</div>}
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Add</button>
      </form>
    </div>
  );
}

export default CreateArticle;
