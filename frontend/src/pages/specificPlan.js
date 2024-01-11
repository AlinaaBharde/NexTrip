import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { Tabs } from 'flowbite-react';
import { IoIosInformationCircleOutline,IoMdRestaurant } from "react-icons/io";
import { FaHotel,FaPlane } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import Hotels from '../components/hotels';

export default function SpecificPlan(){
  const [searchCity, setsearchCity] = useState("");

  function handleSearch(value){
    setsearchCity(value);
  }

  return (
    <div>
        <Navbar />
        <SearchBar onSearch={handleSearch} />
    <Tabs aria-label="Tabs with icons" style="fullWidth" className=' mt-20 relative border-t  '>
      <Tabs.Item  title="Information" icon={IoIosInformationCircleOutline} className=' rounded-t-lg' >
        Information
      </Tabs.Item>
      <Tabs.Item title="Hotels" icon={FaHotel}>
        <Hotels City={searchCity} />
      </Tabs.Item>
      <Tabs.Item title="Restaurants" icon={IoMdRestaurant}>
        Restaurants
      </Tabs.Item>
      <Tabs.Item title="Places" icon={MdPlace}>
        Attractive Places
      </Tabs.Item>
      <Tabs.Item title="Flights" icon={FaPlane}>
        Flights
      </Tabs.Item>
      
    </Tabs>
      <Footer />
    </div>
  )
}



