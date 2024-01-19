import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Button } from 'flowbite-react';
import axios from 'axios';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const News = ({ city }) => {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const locationName = city;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1224);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.post(
          `http://localhost:8000/api/news/fetch/`,
          JSON.stringify(locationName),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) =>{
          const limitedNews = response.data.articles.slice(0, 15);
          setNews(limitedNews);
        })

       
        axios.post(
          `http://localhost:8000/api/events/fetch/`,
          JSON.stringify(locationName),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) =>{
          const eventsData = response.data.data;

          console.log('Events data:', eventsData);
          setEvents(eventsData);
        })

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1224);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [locationName]);

  if (!events || !Array.isArray(events) || events.length === 0) {
    return <div>Loading...</div>;
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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

  return (
    <div>
      <div className='w-3/4 m-auto '>
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
                  <p>Venue: {event.venue.name ? event.venue.name : null}</p>
                  <p>City: {event.venue.city ? event.venue.city : null}</p>
                  {event.ticket_links && event.ticket_links.length > 0 && event.ticket_links[0].link && (
                    <Button as="a" href={event.ticket_links[0].link} target="_blank" rel="noopener noreferrer" color="purple" pill className='bg-indigo-700 text-white text-lg px-6 py-1 rounded-xl'>
                      Get Tickets
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className='w-3/4 m-auto mb-20'><strong className='mx-auto justify-center items-center'>News</strong>
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
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'gray' }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'gray' }}
      onClick={onClick}
    />
  );
};

export default News;
