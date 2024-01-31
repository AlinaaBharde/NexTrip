import React from 'react'

const Banner = () => {
    return (




        <div className="w-full p-4 text-center bg-[#5F2EEA] border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-3xl font-bold text-white dark:text-white">Need more information to get started?</h5>
            {/* <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Stay up to date and move work forward with Flowbite on iOS & Android. Download the app today.</p> */}
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                {/* add href="#/or whatever page you want to link it to" */}
                <a className="w-full sm:w-auto bg-[#5F2EEA] hover focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <div className="text-left rtl:text-right">
                        <button type="button" className="text-white bg-[#5F2EEA] border-2 border-white  outline-black hover:bg-white hover:text-[#5F2EEA] 
            focus:outline-none  font-medium rounded-full
             text-sm px-5 py-2.5 text-center me-2 mb-2">Contact us</button>
                    </div>
                </a>

            </div>
        </div>



    )
}

export default Banner
