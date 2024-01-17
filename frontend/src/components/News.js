import React, { useState, useEffect } from 'react';
import { Card, Button } from 'flowbite-react'; // Import necessary Flowbite components
import axios from 'axios';

const News = ({ city }) => {
  const [news, setNews] = useState([]);
  const City = 'Jaipur'
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${City}&apiKey=`);
        const limitedNews = response.data.articles.slice(0, 15);
        setNews(limitedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [City]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-7xl font-bold mb-6">{`Latest News in ${City}`}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <Card key={index} imgSrc={article.urlToImage} className="mb-4">
            <h3 className="text-lg font-bold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{article.description}</p>
            <div className="mt-4">
              <Button as="a" href={article.url} target="_blank" rel="noopener noreferrer" color="purple" pill>
                Read More
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;
