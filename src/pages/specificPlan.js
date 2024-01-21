import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs } from 'flowbite-react';
import { IoMdRestaurant } from "react-icons/io";
import { FaHotel } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import Hotels from '../components/hotels';
import  Restaurants  from '../components/restaurants';
import Places from '../components/places';
import { useParams } from 'react-router-dom';


export default function SpecificPlan(){
  const {id} = useParams();
 
  return (
    <div>
        <Navbar />
    <Tabs aria-label="Tabs with icons" style="underline" className=' mt-12 mx-auto relative shadow-md' >
      <Tabs.Item title="Hotels" icon={FaHotel}  >
        <Hotels planid={id}/>
      </Tabs.Item>
      <Tabs.Item title="Restaurants" icon={IoMdRestaurant} >
        <Restaurants planid={id} />
      </Tabs.Item>
      <Tabs.Item title="Places" icon={MdPlace} >
        <Places planid={id} />
      </Tabs.Item>
    </Tabs>
      <Footer />
    </div>
  )
}



