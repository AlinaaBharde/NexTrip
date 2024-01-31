import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import { Card } from 'flowbite-react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

const CARD = ({ title, imageUrl }) => (
  <Card className="swiper-slide h-18 sm:h-27 md:h-36 lg:h-60 xl:h-80 hover:scale-110 transition-transform w-20 sm:w-30 md:w-40 lg:w-60 xl:w-80 mx-auto mt-8 mb-8 p-6 bg-cover border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
  imgSrc={imageUrl}>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{title}</h5>
    <a
      className="mb-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-[#fefefe] rounded-lg hover:bg-black hover:text-[#fefefe] focus:ring-4 focus:outline-black focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      href="#"
    >
      Make Plan
      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
      </svg>
    </a>
  </Card>
);

const Gallery = () => {
  const galleryItems = [
    { title: 'California, USA', imageUrl: 'https://i.pinimg.com/736x/72/0e/ce/720ece0a03d45dcfc2a3c4c6a9ebfa7c.jpg' },
    { title: 'Dubai, UAE', imageUrl: 'https://i.pinimg.com/736x/b2/85/2e/b2852e0f2efeb404d63ee8bf7ccb8115.jpg' },
    { title: 'Paris, France', imageUrl: 'https://i.pinimg.com/originals/a0/ac/ca/a0acca15036d10f43a54fc798ec1bd0d.jpg' },
    { title: 'Mumbai, India', imageUrl: 'https://i.pinimg.com/736x/73/dc/57/73dc57de372401a3eda9f174a3d79c52.jpg' },
    { title: 'Singapore, Singapore', imageUrl: 'https://i.pinimg.com/736x/eb/1f/06/eb1f06802d57ad7e0825a98d1702f192.jpg' },
  ];

  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      spaceBetween: 10,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1020: {
          slidesPerView: 3,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      effect: 'slide',
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="font-Poppins ml-16 mt-10">
      <p className="text-[#BCA4FF] text-2xl mt-4">Gallery</p>

      <div className="text-[#4E4B66] text-4xl font-bold mt-4">
        <h1>
          View the wonderful,
          <h1>Trending places you can visit</h1>
        </h1>
      </div>

      <div id="cards" className="swiper-container mt-8">
        <div className="swiper-wrapper">
          {galleryItems.map((item, index) => (
            <CARD key={index} title={item.title} imageUrl={item.imageUrl} im />
          ))}
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </div>
  );
};

export default Gallery;
