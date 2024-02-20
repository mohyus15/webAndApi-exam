import React, { useContext, useState, useEffect } from 'react';
import { authContext } from '../store/userContext';
import { articleContext } from '../store/ArticleContextProvider';
import { DELETE_ARTICLE } from '../store/types';

function ArticlesRelatedToCurrentUser() {
  const { user } = useContext(authContext);
  const { dispatch } = useContext(articleContext);
  const [userArticles, setUserArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const { json } = await response.json();
        dispatch({ type: DELETE_ARTICLE, payload: json });
        const articlesRelatedToCurrentUser = json.filter(article => article.name === user.name);
        setUserArticles(articlesRelatedToCurrentUser);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching articles:', error);
      }
    };
    fetchUserArticles();
  }, [user.name, dispatch]);

  const handleDelete = async (articleId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/news/${articleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete article');
      }
      await response.json();

      dispatch({ type: 'DELETE_ARTICLE', payload: articleId });

      // Reload the page after deleting the article
      window.location.reload();
    } catch (error) {
      setError(error.message);
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div>
      <h2>Articles Related to {user.name}</h2>
      {error && <p style={{ width: '80%', color: 'red', margin: 'auto', textAlign: 'center', maxWidth: '500px', height: 'auto' }}>Error: {error}</p>}
      {userArticles.length > 0 ? (
        <ul>
          {userArticles.map(article => (
            <li key={article._id}>
              <h3>{article.title}</h3>
              {article.image && (
                <img src={article.image} style={{ width: '80%', maxWidth: '500px', height: 'auto' }} alt={article.title} />
              )}
              <p>{article.text}</p>
              <button onClick={() => handleDelete(article._id)} style={{ width: '80%', maxWidth: '500px', height: 'auto', backgroundColor: 'red' }}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found related to {user.name}</p>
      )}
    </div>
  );
}

export default ArticlesRelatedToCurrentUser;
