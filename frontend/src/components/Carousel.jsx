import React from 'react';

const Carousel = () => {
  const carouselItems = [
    { title: 'California, USA', imageUrl: 'https://i.pinimg.com/736x/72/0e/ce/720ece0a03d45dcfc2a3c4c6a9ebfa7c.jpg' },
    { title: 'Dubai, UAE', imageUrl: 'https://i.pinimg.com/736x/b2/85/2e/b2852e0f2efeb404d63ee8bf7ccb8115.jpg' },
    { title: 'Paris, France', imageUrl: 'https://i.pinimg.com/originals/a0/ac/ca/a0acca15036d10f43a54fc798ec1bd0d.jpg' },
    { title: 'Mumbai, India', imageUrl: 'https://i.pinimg.com/736x/73/dc/57/73dc57de372401a3eda9f174a3d79c52.jpg' },
    { title: 'Singapore, Singapore', imageUrl: 'https://i.pinimg.com/736x/eb/1f/06/eb1f06802d57ad7e0825a98d1702f192.jpg' },
  ];

  return (
    <div className='mt-8 flex flex-row justify-between space-x-6 font-Poppins'>
      {carouselItems.map((item, index) => (
        <div key={index} className={`h-18 sm:h-27 md:h-36 lg:h-60 xl:h-80 hover:scale-110 transition-transform w-20 sm:w-30 md:w-40 lg:w-60 xl:w-80 mx-auto mt-8 mb-8 p-6 bg-cover border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between`}>
          <h5 className={`mb-2 text-2xl font-bold tracking-tight ${index === 2 ? 'text-white' : 'text-[#fef9fc] dark:text-white'}`}>{item.title}</h5>
          <a className='mb-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Make Plan
            <svg className='rtl:rotate-180 w-3.5 h-3.5 ms-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
              <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Carousel;
