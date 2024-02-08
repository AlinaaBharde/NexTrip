import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button, Spinner } from 'flowbite-react';
import axios from 'axios';
import '../styles/colorgradient.css';
import './News.css';


export default function Events({ locationName, index }) {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const City = locationName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=${City}&apiKey=be08998cf6b34115895517e0fbde1df9`);
        const limitedNews = newsResponse.data.articles.slice(0, 15);
        setNews(limitedNews);

        const eventsResponse = await axios.request({
          method: 'GET',
          url: 'https://real-time-events-search.p.rapidapi.com/search-events',
          params: {
            query: `Concerts in ${City}`,
            start: '0'
          },
          headers: {
            'X-RapidAPI-Key': 'fdebd55b92msh21517247185c7e1p13b3cejsn928ff4381e55',
            'X-RapidAPI-Host': 'real-time-events-search.p.rapidapi.com'
          }
        });

        const eventsData = eventsResponse.data.data;

        console.log('Events data:', eventsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (index === 4) {
      fetchData();
    }
  }, [City, index]);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <div>
      <div className='w-3/4 m-auto mb-20'>
        <strong className='mx-auto justify-center items-center text-5xl text-indigo-700'>Events</strong>
        <div className='mt-10 events-carousel'>
          {events.length === 0 ? (
            <div className='flex items-center justify-center h-full'>
              <Spinner aria-label="Default status example" className='m-auto flex items-center justify-center' size='xl' color='purple' />
            </div>
          ) : (
            events.map((event, index) => (
              <animated.div key={index} style={props} className='bg-white border shadow text-black rounded-xl event-card '>
                <div className='rounded-t-xl flex justify-center items-center h-56'>
                  <img src={event.thumbnail} alt='' className='h-full w-full rounded-xl' />
                </div>
                <div className='flex flex-col justify-center items-center gap-4 p-4'>
                  <h3 className='text-xl font-semibold'>{event.name}</h3>
                  <p>{event.description ? event.description.slice(0, 100) : null}...</p>
                  <p>Start Time: {event.start_time ? event.start_time : null}</p>
                  <p>End Time: {event.end_time ? event.end_time : null}</p>
                </div>
              </animated.div>
            )))
          }
        </div>
      </div>

      <div className='w-3/4 m-auto mb-20'>
        <strong className='mx-auto justify-center items-center text-5xl text-indigo-700'>News</strong>
        <div className='mt-10 news-carousel'>
          {news.length !== 0 ? (news.map((article, index) => (
            <animated.div key={index} style={props} className='bg-white border shadow text-black rounded-xl news-card'>
              <div className='rounded-t-xl flex justify-center items-center h-56'>
                <img src={article.urlToImage} alt='' className='h-full w-full rounded-xl' />
              </div>
              <div className='flex flex-col justify-center items-center gap-4 p-4'>
                <h3 className='text-xl font-semibold'>{article.title.slice(0, 40)}...</h3>
                <p>{article.description.slice(0, 100)}...</p>
                <Button
                  as='a'
                  href={article.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  color='purple'
                  pill
                  className='bg-indigo-700 text-white text-lg px-6 py-1 rounded-xl'
                >
                  Read more
                </Button>
              </div>
            </animated.div>
          ))) : (
            <div className='flex items-center justify-center h-full'>
              <Spinner aria-label="Default status example" className='flex items-center justify-center m-auto' size='xl' color='purple' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
