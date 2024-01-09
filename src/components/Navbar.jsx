import React,{useState,useEffect} from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import { RiAccountCircleLine } from "react-icons/ri";

const Navbar=()=>{
    // const [click,setclick]=useState(true)
    // //  useEffect(()=>{ const handleChange=()=>{
    // //     setclick(!click)
    // // }
    // // ,[]})

    // const handchange = () => {
    //     setclick(!click)
    //   }

    // useEffect(() => {
    //     // Define the handleChange function
        
    //     handchange()
    //     // Call the handleChange function
        
    //   }, [])
    // // const [nav,setNav]=useState[false]
    
    return(
        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black'>
            <h1 className='w-full text-3xl font-Poppins font-bold text-[#5F2EEA]' >Trip Planner</h1>
            <RiAccountCircleLine size={30} color='#5F2EEA'/>
            <ul className='flex '>
                <li className='p-4 font-Poppins text-[#5F2EEA]'>Login/SignUp</li>
            </ul> 
             
        <div>
        
            <AiOutlineMenu size={20} color='#5F2EEA'/>
        </div>
        {/* <div className='fixed right-0 top-0   '>
            <ul className=' uppercase bg-[#2A00A2]'>
                <li className='p-4 text-white font-Poppins'>Home</li>
                <li className='p-4 text-white font-Poppins'>Services</li>
                <li className='p-4 text-white font-Poppins'>Continents</li>
                <li className='p-4 text-white font-Poppins'>Contact</li>
                <li className='p-4 text-white font-Poppins'>Privacy</li>
                <li className='p-4 text-white font-Poppins'>Register</li>
            </ul>
        </div> */}
        </div>
        

// {/* <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
//   <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//     <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
//         <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
//         <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
//     </a>
//     <button onClick={handchange} data-collapse-toggle="navbar-hamburger" type="button" class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
//       <span class="sr-only">Open main menu</span>
//       <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
//       </svg>
//     </button>
//     {click && 
//     <div  class=" w-full" id="navbar-hamburger">
//       <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
//         <li>
//           <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600" aria-current="page">Home</a>
//         </li>
//         <li>
//           <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Services</a>
//         </li>
//         <li>
//           <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Pricing</a>
//         </li>
//         <li>
//           <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Contact</a>
//         </li>
//       </ul>
//     </div>
//     }
//   </div>
// </nav> */}

    )
}

export default Navbar
// import React,{useState} from 'react'
// import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'

// const Navbar=()=>{
//     const [nav,setNav]=useState[false]
    
//     return(
//         <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black'>
//             <h1 className='w-full text-3xl font-Poppins font-bold text-[#5F2EEA]' >Trip Planner</h1>
//             <ul className='flex '>
//                 <li className='p-4 font-Poppins text-[#5F2EEA]'>Login/SignUp</li>
//             </ul> 
             
//         <div>
        
//             <AiOutlineMenu size={20} color='#5F2EEA'/>
//         </div>
//         <div className='fixed right-0 top-0   '>
//             <ul className=' uppercase bg-[#2A00A2]'>
//                 <li className='p-4 text-white font-Poppins'>Home</li>
//                 <li className='p-4 text-white font-Poppins'>Services</li>
//                 <li className='p-4 text-white font-Poppins'>Continents</li>
//                 <li className='p-4 text-white font-Poppins'>Contact</li>
//                 <li className='p-4 text-white font-Poppins'>Privacy</li>
//                 <li className='p-4 text-white font-Poppins'>Register</li>
//             </ul>
//         </div>
       
// <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
// <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
// </svg>
// </button>

// {/* <!-- Dropdown menu --> */}
// <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//     <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
//       <li>
//         <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
//       </li>
//       <li>
//         <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
//       </li>
//       <li>
//         <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
//       </li>
//       <li>
//         <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
//       </li>
//     </ul>
// </div>

//         </div>
//     )
// }

// export default Navbar