import React, { useEffect } from 'react'
import Swiper from 'swiper/bundle';

const Gallery = () => {


    useEffect(()=>{

        const swiper = new Swiper('.swiper', {
  // Optional parameters
//   direction: 'horizontal',
  loop: true,
  spaceBetween:10,

  autoplay:{
    delay:3000,
    disableOnInteraction:false,
  },

  breakpoints:{
    0:{
        slidesPerView:1,
    },
    768:{
        slidesPerView:2,
    },
    1020:{
        slidesPerView:3,
    },


  }



  
,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'slide',

  
});

return () => {
      swiper.destroy(); // Clean up Swiper instance when the component unmounts
    };
  }, []); // Run the effect only once on mount

    

    
    

    return (

        




        <div className='font-Poppins ml-16 mt-10'>
            <p className='text-[#BCA4FF] text-2xl mt-4'>Gallery</p>

            <div className='text-[#4E4B66] text-4xl font-bold mt-4'>
                <h1 >
                    View the wonderful ,
                    <h1>Trending places you can visit</h1>
                </h1>
            </div>

            


            <div id='cards' className=' swiper mt-8 flex flex-row justify-between space-x-6 font-Poppins'>
                <div className='swiper-wrapper'>
                    {/* make card components out of these when you get time */}
                    
                    <div class=" swiper-slide h-18 sm:h-27 md:h-36 lg:h-60 xl:h-80  hover:scale-110 transition-transform
w-20 sm:w-30 md:w-40 lg:w-60 xl:w-80 mx-auto mt-8 mb-8

p-6 bg-cover  bg-[url('https://i.pinimg.com/736x/72/0e/ce/720ece0a03d45dcfc2a3c4c6a9ebfa7c.jpg')] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
flex flex-col justify-between ">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#fef9fc] dark:text-white">California,USA</h5>


                        <a class=" mb-4  inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-[#fefefe] rounded-lg
   hover:bg-black hover:text-[#fefefe] focus:ring-4 focus:outline-black focus:ring-blue-300
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Make Plan
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>


                    <div class=" swiper-slide  h-18 sm:h-27 md:h-36 lg:h-60 xl:h-80 
w-20 sm:w-30 md:w-40 lg:w-60 xl:w-80 mx-auto mt-8 mb-8 hover:scale-110 transition-transform

p-6 bg-cover  bg-[url('https://i.pinimg.com/736x/b2/85/2e/b2852e0f2efeb404d63ee8bf7ccb8115.jpg')] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
flex flex-col justify-between ">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#fef9fc] dark:text-white">Dubai,UAE</h5>


                        <a class=" mb-4  inline-flex items-center px-3 py-2 text-sm font-medium text-centertext-black bg-[#fefefe] rounded-lg
   hover:bg-black hover:text-[#fefefe] focus:ring-4 focus:outline-none focus:ring-blue-300
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Make Plan
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>

                    <div class=" swiper-slide  h-18 sm:h-27 md:h-36 lg:h-60 xl:h-80 
w-20 sm:w-30 md:w-40 lg:w-60 xl:w-80 mx-auto mt-8 mb-8 hover:scale-110 transition-transform

p-6 bg-cover  bg-[url('https://i.pinimg.com/originals/a0/ac/ca/a0acca15036d10f43a54fc798ec1bd0d.jpg')] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
flex flex-col justify-between ">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#fef9fc] dark:text-white">Paris,France</h5>


                        <a class=" mb-4  inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-[#fefefe] rounded-lg
   hover:bg-black hover:text-[#fefefe] focus:ring-4 focus:outline-none focus:ring-blue-300
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Make Plan
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>

                    <div class=" swiper-slide  h-18 sm:h-27 md:h-36 lg:h-60 xl:h-80 
w-20 sm:w-30 md:w-40 lg:w-60 xl:w-80 mx-auto mt-8 mb-8 hover:scale-110 transition-transform

p-6 bg-cover  bg-[url('https://i.pinimg.com/736x/73/dc/57/73dc57de372401a3eda9f174a3d79c52.jpg')] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
flex flex-col justify-between ">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#fef9fc] dark:text-white">Mumbai,India</h5>


                        <a class=" mb-4  inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-[#fefefe] rounded-lg
   hover:bg-black hover:text-[#fefefe]0 focus:ring-4 focus:outline-none focus:ring-blue-300
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Make Plan
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>

                    <div class=" swiper-slide  h-18 sm:h-27 md:h-36 lg:h-60 xl:h-80 
w-20 sm:w-30 md:w-40 lg:w-60 xl:w-80 mx-auto mt-8 mb-8 hover:scale-110 transition-transform

p-6 bg-cover  bg-[url('https://i.pinimg.com/736x/eb/1f/06/eb1f06802d57ad7e0825a98d1702f192.jpg')] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
flex flex-col justify-between ">

                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#fef9fc] dark:text-white">Singapore,Singapore</h5>


                        <a class=" mb-4  inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-[#fefefe] rounded-lg
   hover:bg-black hover:text-[#fefefe] focus:ring-4 focus:outline-none focus:ring-blue-300
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Make Plan
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>






    )
}

export default Gallery


