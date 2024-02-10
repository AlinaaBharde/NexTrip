import React from 'react';

const Banner = () => {
  return (
    <div className=" p-4 mb-4 text-center bg-[#5F2EEA] border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-3xl font-bold text-white dark:text-white">Need more information to get started?</h5>
      {/* <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Stay up to date and move work forward with Flowbite on iOS & Android. Download the app today.</p> */}
      <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        {/* Add href="#/or whatever page you want to link it to" */}
        <a href="#your-link" className="w-full sm:w-auto bg-[#5F2EEA] hover focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
          {/* <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg> */}
          <div className="text-left rtl:text-right">
            <button
              type="button"
              className="text-white bg-[#5F2EEA] border-2 border-white outline-black hover:bg-white hover:text-[#5F2EEA] focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Contact us
            </button>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Banner;
