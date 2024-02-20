import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from './loader'; 

const HomePage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }
        const data = await response.json();
        setNewsData(data.json); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news data:', error);
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className="container">
      <div className="news-container">
        <h1>Latest News</h1>
        {loading ? (
          <Loader  /> 
        ) : (
          <>
            {newsData.map((newsItem) => (
              <div key={newsItem._id} style={{ marginBottom: '20px' }}>
                <h2>{newsItem.title}</h2>
                <img src={newsItem.image} alt={newsItem.title} style={{ width: '80%', maxWidth: '500px', height: 'auto' }} />
                <p>{newsItem.text.slice(0,300)} <Link to={`/components/ArticleDetails/${newsItem._id}`}>read more ...</Link></p>
                <p>Author: {newsItem.name}</p>
              </div>
            ))}
            {newsData.length === 0 && <p>No news available</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
