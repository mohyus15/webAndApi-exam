import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ArticleDetails() {
  const [article, setArticle] = useState(null);
  const { newsItemId } = useParams();
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/news/${newsItemId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article data');
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };
    fetchArticle();
  }, [newsItemId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Title: {article.title}</h2>
      <img src={article.image} alt={article.title} style={{ width: '80%', maxWidth: '500px', height: 'auto' }} />
      <h5>{article.text}</h5>
      <h5>Author: {article.name}</h5>
    </div>
  );
}

export default ArticleDetails;
