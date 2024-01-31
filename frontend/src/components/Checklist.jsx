import React from 'react'

const Checklist = () => {
   return (
      <div className='Poppins ml-16 mt-10'>
         <p className='text-[#BCA4FF] text-xl'>PLANNING AHEAD</p>
         <div className='text-[#4E4B66] text-4xl font-bold mt-3'>
            <h1 >
               Let’s review your checklist of everything
            </h1>
         </div>

         <div className='mt-4'>
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
               <li className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                     <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Neil Sims
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                           email@flowbite.com
                        </p>
                     </div>
                     <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $320
                     </div>
                  </div>
               </li>
               <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                     <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Neil image" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Bonnie Green
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                           email@flowbite.com
                        </p>
                     </div>
                     <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $3467
                     </div>
                  </div>
               </li>
               <li clasName="py-3 sm:py-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                     <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Neil image" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Michael Gough
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                           email@flowbite.com
                        </p>
                     </div>
                     <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $67
                     </div>
                  </div>
               </li>
               <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                     <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Neil image" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Thomas Lean
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                           email@flowbite.com
                        </p>
                     </div>
                     <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $2367
                     </div>
                  </div>
               </li>
               <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                     <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Neil image" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                           Lana Byrd
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                           email@flowbite.com
                        </p>
                     </div>
                     <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $367
                     </div>
                  </div>
               </li>
            </ul>
         </div>


      </div>

   )
}

export default Checklist


/* /* <div className='text-[#14142B]'>
         <ul>
            <li>Plan 1</li>
            <li>Plan 2</li> 
            <li> Plan 3</li>
            <li>...</li> 
         </ul>

     </div>
     <img src="src\airhelp.png" alt="airhelp" /> */