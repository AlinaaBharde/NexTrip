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


  const handleUpdate = () => {
    window.location.href = 'http://localhost:5173/plan/' + id;
  };

  return (
    <div className='w-screen bg-white'>
      <Navbar />
      <Tabs aria-label="Tabs with icons" style="underline" className=' mt-12 mx-auto relative shadow-md' >
        <Tabs.Item title="Hotels" icon={FaHotel} >
          <Hotels planid={id} />
        </Tabs.Item>
        <Tabs.Item title="Restaurants" icon={IoMdRestaurant} >
          <Restaurants planid={id} />
        </Tabs.Item>
        <Tabs.Item title="Places" icon={MdPlace} >
          <Places planid={id} />
        </Tabs.Item>
      </Tabs>
      <button className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow z-10" onClick={handleUpdate}>
        Update
      </button>
      <Footer />
    </div>
  )
}



