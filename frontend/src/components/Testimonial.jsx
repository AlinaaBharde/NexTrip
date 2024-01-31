import React from 'react';

const Testimonials = () => {
    const testimonialsData = [
        {
            quote: 'Very easy to multiple plan trips!',
            description: 'If you care for your time, I hands down would go with this.',
            name: 'Bonnie Green',
            role: 'Travel YouTuber',
            image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png',
        },
        {
            quote: 'One of the best websites for planning any vacation',
            description: 'Helped me plan my first vacation to Europe!',
            name: 'Roberta Casas',
            role: 'Instagram Influencer',
            image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png',
        },
        {
            quote: 'Mind-blowing user experience',
            description: 'Aesthetically, the well-designed components are beautiful.',
            name: 'Jese Leos',
            role: 'Exchange Student',
            image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
        },
        {
            quote: 'Amazing trips and options',
            description: 'You have many options to choose from and decide.',
            name: 'Joseph McFall',
            role: 'Travel Blogger',
            image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png',
        },
    ];

    return (
        <div className='Poppins ml-16 mt-10'>
            <p className='text-[#BCA4FF]'>TESTIMONIALS</p>
            <div className='text-[#4E4B66] text-4xl font-bold mt-3'>
                <h1>Let’s see what fans of TripPlanner have to say</h1>
            </div>

            <div className='mt-8 grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800'>
                {testimonialsData.map((testimonial, index) => (
                    <figure
                        key={index}
                        className={`flex flex-col items-center justify-center p-8 text-center bg-white ${
                            index === 0 ? 'rounded-t-lg' : index === testimonialsData.length - 1 ? 'rounded-b-lg' : ''
                        } border-b border-gray-200 md:rounded-se-lg md:border-e dark:bg-gray-800 dark:border-gray-700`}
                    >
                        <blockquote className='max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{testimonial.quote}</h3>
                            <p className='my-4'>{testimonial.description}</p>
                        </blockquote>
                        <figcaption className='flex items-center justify-center '>
                            <img
                                className='rounded-full w-9 h-9'
                                src={testimonial.image}
                                alt={`${testimonial.name}'s profile`}
                            />
                            <div className='space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3'>
                                <div>{testimonial.name}</div>
                                <div className='text-sm text-gray-500 dark:text-gray-400 '>{testimonial.role}</div>
                            </div>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
