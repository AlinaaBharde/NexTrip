import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Button } from 'flowbite-react';
import axios from 'axios';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_KEY_NEWS = 'be08998cf6b34115895517e0fbde1df9';
const API_KEY_EVENTS = 'bb35022490msh13314922336777ap17bf40jsn764d272f6d64';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const EVENTS_API_URL = 'https://real-time-events-search.p.rapidapi.com/search-events';

export default function News({ locationName, index }) {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const City = locationName;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1224);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch news
        const newsResponse = await axios.get(`${NEWS_API_URL}?q=${City}&apiKey=${API_KEY_NEWS}`);
        const limitedNews = newsResponse.data.articles.slice(0, 15);
        setNews(limitedNews);

        // Fetch events
        const eventsResponse = await axios.get(EVENTS_API_URL, {
          params: {
            query: `Concerts in ${City}`,
            start: '0',
          },
          headers: {
            'X-RapidAPI-Key': API_KEY_EVENTS,
            'X-RapidAPI-Host': 'real-time-events-search.p.rapidapi.com',
          },
        });

        const eventsData = eventsResponse.data.data;
        const limitedEvents = eventsData.slice(0,10);
        setEvents(limitedEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (index === 4) {
      fetchData();
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1224);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [City, index]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Events Slider */}
      <div className='w-3/4 m-auto mb-20'>
        <strong className='mx-auto justify-center items-center'>Events</strong>
        <div className='mt-10'>
          <Slider {...settings} slidesToShow={isSmallScreen ? 1 : 3}>
            {events.map((event, index) => (
              <div key={index} style={{ maxHeight: '450px', minHeight: '450px' }} className='bg-white border shadow text-black rounded-xl'>
                <div className='flex flex-col justify-center items-center gap-4 p-4'>
                  <h3 className='text-xl font-semibold'>{event.name}</h3>
                  <p>{event.description ? event.description.slice(0, 100) : null}...</p>
                  <p>Start Time: {event.start_time ? event.start_time : null}</p>
                  <p>End Time: {event.end_time ? event.end_time : null}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* News Slider */}
      <div className='w-3/4 m-auto mb-20'>
        <strong className='mx-auto justify-center items-center'>News</strong>
        <div className='mt-10'>
          <Slider {...settings} slidesToShow={isSmallScreen ? 1 : 3}>
            {news.map((article, index) => (
              <div key={index} style={{ maxHeight: '450px', minHeight: '450px' }} className='bg-white border shadow text-black rounded-xl'>
                <div className='rounded-t-xl flex justify-center items-center h-56'>
                  <img src={article.urlToImage} alt='' className='h-full w-full rounded-xl' />
                </div>
                <div className='flex flex-col justify-center items-center gap-4 p-4'>
                  <h3 className='text-xl font-semibold'>{article.title.slice(0, 40)}...</h3>
                  <p>{article.description.slice(0, 100)}...</p>
                  <Button as="a" href={article.url} target="_blank" rel="noopener noreferrer" color="purple" pill className='bg-indigo-700 text-white text-lg px-6 py-1 rounded-xl'>
                    Read more
                  </Button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}



const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'gray' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'gray' }}
      onClick={onClick}
    />
  );
};


