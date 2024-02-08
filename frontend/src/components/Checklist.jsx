import React from 'react';

const Checklist = () => {
  const checklistItems = [
    { name: 'Neil Sims', email: 'email@flowbite.com', amount: '$320' },
    { name: 'Bonnie Green', email: 'email@flowbite.com', amount: '$3467' },
    { name: 'Michael Gough', email: 'email@flowbite.com', amount: '$67' },
    { name: 'Thomas Lean', email: 'email@flowbite.com', amount: '$2367' },
    { name: 'Lana Byrd', email: 'email@flowbite.com', amount: '$367' },
  ];

  return (
    <div className='Poppins ml-16 mt-10'>
      <p className='text-[#BCA4FF] text-xl'>PLANNING AHEAD</p>
      <div className='text-[#4E4B66] text-4xl font-bold mt-3'>
        <h1>Let’s review your checklist of everything</h1>
      </div>

      <div className='mt-4'>
        <ul className='max-w-md divide-y divide-gray-200 dark:divide-gray-700'>
          {checklistItems.map((item, index) => (
            <li key={index} className={`py-3 ${index !== checklistItems.length - 1 ? 'sm:py-4' : 'pb-0 sm:pt-4'}`}>
              <div className='flex items-center space-x-4 rtl:space-x-reverse'>
                <div className='flex-shrink-0'>
                  <img className='w-8 h-8 rounded-full' src={`/docs/images/people/profile-picture-${index + 1}.jpg`} alt={`${item.name} image`} />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>{item.name}</p>
                  <p className='text-sm text-gray-500 truncate dark:text-gray-400'>{item.email}</p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>{item.amount}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Checklist;
