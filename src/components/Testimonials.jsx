import React,{ useState } from 'react'


const Testimonials=()=>{
    return(
        <div className='Poppins ml-16 mt-10'>
        <p className='text-[#BCA4FF]'>TESTIMONIALS</p>
	<div className='text-[#4E4B66] text-4xl font-bold mt-3'>
        <h1 >
        Let’s see what fans of TripPlanner have to say
        </h1>
        </div>

        

<div class="mt-8 grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
    <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Very easy to multiple plan trips!</h3>
            <p class="my-4">If you care for your time, I hands down would go with this."</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture" />
            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                <div>Bonnie Green</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 ">Travel youtuber</div>
            </div>
        </figcaption>    
    </figure>
    <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">One of the best website for planning any vacation</h3>
            <p class="my-4">Helped me trip my first vacation to Europe!"</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture" />
            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                <div>Roberta Casas</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Instagaram Influencer</div>
            </div>
        </figcaption>    
    </figure>
    <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-es-lg md:border-b-0 md:border-e dark:bg-gray-800 dark:border-gray-700">
        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Mindblowing user experience</h3>
            <p class="my-4">Aesthetically, the well designed components are beautiful ."</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile picture" />
            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                <div>Jese Leos</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Exchange student </div>
            </div>
        </figcaption>    
    </figure>
    <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
        <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Amazing trips and options</h3>
            <p class="my-4">You have many options to choose from and decide."</p>
        </blockquote>
        <figcaption class="flex items-center justify-center ">
            <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="profile picture" />
            <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                <div>Joseph McFall</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Travel Blogger</div>
            </div>
        </figcaption>    
    </figure>
</div>

	</div>
    )
}

export default Testimonials