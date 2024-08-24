import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/WildlifeNews.css'; // Import the CSS file

const NewsAPIKey = '3c03d6657fb34d699a2b15b9dc304057';

const WildlifeNews = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=wildlife&apiKey=${NewsAPIKey}`);
        setArticles(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [articles.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  if (loading) {
    return <div className="news-box">Loading...</div>;
  }

  if (error) {
    return <div className="news-box">Error: {error.message}</div>;
  }

  const getArticleIndex = (indexOffset) => {
    return (currentIndex + indexOffset + articles.length) % articles.length;
  };

  return (
    <div className="news-box">
      {/* <h1>Wildlife News</h1> */}
      <div className="news-carousel">
        <button className="nav-btn prev-btn" onClick={handlePrevious}>&#8249;</button>
        <div className="news-cards">
          {[-1, 0, 1].map((offset) => {
            const article = articles[getArticleIndex(offset)];
            const { url, urlToImage, title, description } = article;
            return (
              <div key={offset} className={`news-card ${offset === 0 ? 'focused' : 'blurred'}`}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {urlToImage && <img src={urlToImage} alt={title} className="news-image" />}
                  <h4>{title}</h4>
                </a>
                <p className='description-news'>{description}</p>
              </div>
            );
          })}
        </div>
        <button className="nav-btn next-btn" onClick={handleNext}>&#8250;</button>
      </div>
    </div>
  );
};

export default WildlifeNews;
