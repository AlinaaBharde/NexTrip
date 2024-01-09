import React from 'react'

const Gallery=()=>{
    return(
        <div className='font-Poppins ml-16 mt-10'>
        <p className='text-[#BCA4FF] text-2xl mt-4'>Gallery</p>
        
        <div className='text-[#4E4B66] text-4xl font-bold mt-4'>
        <h1 >
        View the wonderful ,
        <h1>Trending places you can visit</h1>
        </h1>
        </div>

        {/* https://i.pinimg.com/736x/bb/a4/d2/bba4d2db99bb54b76b2bf6d392e88d16.jpg */}
        <div id='cards' className='mt-8 flex flex-row space-x-6 font-Poppins'>

<div class="max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg w-full md:w-full lg:w-full xl:w-full h-auto md:h-64 lg:h-72 xl:h-80 flex-shrink-0 bg-cover p-6 bg-[url('https://i.pinimg.com/736x/bb/a4/d2/bba4d2db99bb54b76b2bf6d392e88d16.jpg')] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Paris, Italy</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Trending No.1</p>
    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>


<div class="max-w-sm p-6 bg-cover  bg-[url('https://i.pinimg.com/736x/bb/a4/d2/bba4d2db99bb54b76b2bf6d392e88d16.jpg')] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>


{/* https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fnourishing-cities-los-angeles-edition--582512533056139225%2F&psig=AOvVaw3-ZocTBu07Ik4Cs9TVHwIc&ust=1704608506763000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNiR8tiPyIMDFQAAAAAdAAAAABAD */}

<div class="max-w-sm h-110  p-6 bg-cover  bg-[url('https://i.pinimg.com/736x/72/0e/ce/720ece0a03d45dcfc2a3c4c6a9ebfa7c.jpg')] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>

<div class="max-w-sm h-110 mx-auto max-w-screen-xl p-6 bg-cover  bg-[url('https://i.pinimg.com/736x/72/0e/ce/720ece0a03d45dcfc2a3c4c6a9ebfa7c.jpg')] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>

</div>

        




        </div>
    )
}

export default Gallery
