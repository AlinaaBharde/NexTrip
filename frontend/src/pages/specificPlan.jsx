import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs } from 'flowbite-react';
import { IoMdRestaurant } from "react-icons/io";
import { FaHotel } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import Hotels from '../components/userHotels';
import Restaurants from '../components/userRestaurants';
import Places from '../components/userPlaces';
import { useParams } from 'react-router-dom';


export default function SpecificPlan() {
  const { id } = useParams();
  console.log(id);



  return (
    <div className='w-screen bg-white'>
      <div className='w-full mt-0'>
        <Navbar />
      </div>
      <Tabs aria-label="Tabs with icons" style="underline" className='pl-6 pt-8 pb-4 font-bold text-base rounded-md shadow text-center text-blue-500 flex justify-center w-screen' >
        <Tabs.Item title="Hotels" icon={FaHotel} className='text-base' >
          <Hotels planid={id} />
        </Tabs.Item>
        <Tabs.Item title="Restaurants" icon={IoMdRestaurant} className='text-base' >
          <Restaurants planid={id} />
        </Tabs.Item>
        <Tabs.Item title="Places" icon={MdPlace} className='text-base'>
          <Places planid={id} />
        </Tabs.Item>
      </Tabs>
      <Footer />
    </div>
  )
}



