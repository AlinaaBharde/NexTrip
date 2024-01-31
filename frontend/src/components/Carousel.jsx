import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Paris from '../images/Paris.jpg';
import Cal from '../images/new-york.jpg';
import Dubai from '../images/dubai.jpg';
import Sngapor from '../images/singapore.jpg';
import './News.css';

const CarouselItem = ({ title, imageUrl }) => {
  const [isHovered, setHovered] = useState(false);

  const hoverAnimation = useSpring({
    transform: `scale(${isHovered ? 1.1 : 1})`,
  });

  return (
    <animated.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...hoverAnimation,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '18rem', // Adjust the height as needed
        width: '20rem', // Adjust the width as needed
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        border: '1px solid #c4c4c4',
        borderRadius: '0.5rem',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
      className={`mx-auto mt-8 mb-8 text-white transition-transform event-card`}
    >
      <h5 className={`mb-2 text-2xl font-bold tracking-tight`}>{title}</h5>
      <a
        className='mb-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
      >
        Make Plan
        <svg
          className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 10'
        >
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
        </svg>
      </a>
    </animated.div>
  );
};

const Carousel = () => {
  const carouselItems = [
    { title: 'California, USA', imageUrl: Cal },
    { title: 'Dubai, UAE', imageUrl: Dubai },
    { title: 'Paris, France', imageUrl: Paris },
    { title: 'Mumbai, India', imageUrl: 'https://i.pinimg.com/736x/73/dc/57/73dc57de372401a3eda9f174a3d79c52.jpg' },
    { title: 'Singapore, Singapore', imageUrl: Sngapor },
    // Add more items as needed
  ];

  return (
    <div className="font-Poppins ml-16 mt-10">
      <p className="text-[#BCA4FF] text-lg mt-4">Gallery</p>

      <div className="text-[#4E4B66] text-xl font-bold mt-4">
        <h1>
          View the wonderful,
          <p>Trending places you can visit</p>
        </h1>
      </div>
      <div className='mt-8 flex flex-row space-x-6 font-Poppins overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300' style={{ width: '100%' }}>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} title={item.title} imageUrl={item.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
