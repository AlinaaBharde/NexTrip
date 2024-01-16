import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs } from 'flowbite-react';
import { IoIosInformationCircleOutline,IoMdRestaurant } from "react-icons/io";
import { FaHotel,FaPlane } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import Hotels from '../components/hotels';
import  Restaurants  from '../components/restaurants';
import Places from '../components/places';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SpecificPlan(){
  const {id} = useParams();
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null,
  });

  const [locationName, setlocationName]= useState('');

  React.useEffect(() => {
    
    const fetchTravelDetails = async () => {
      try {
        const { startDate, endDate, City } = await axios.get(`http://localhost:8000/plan/${id}`);
        setSelectedDates({ startDate, endDate });
        setlocationName(City);
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };

    fetchTravelDetails();
  }, [id]);


  return (
    <div>
        <Navbar />
    <Tabs aria-label="Tabs with icons" style="underline" className=' mt-12 mx-auto relative shadow-md' >
      <Tabs.Item  title="Information" icon={IoIosInformationCircleOutline}   >
        Information
      </Tabs.Item>
      <Tabs.Item title="Hotels" icon={FaHotel}  >
        <Hotels locationName={locationName} startDate={selectedDates.checkIn} endDate={selectedDates.checkOut} planid={id}/>
      </Tabs.Item>
      <Tabs.Item title="Restaurants" icon={IoMdRestaurant} >
        <Restaurants locationName={locationName} planid={id} />
      </Tabs.Item>
      <Tabs.Item title="Places" icon={MdPlace} >
        <Places locationName={locationName} planid={id} />
      </Tabs.Item>
      <Tabs.Item title="Flights" icon={FaPlane} >
        Flights
      </Tabs.Item>
      
    </Tabs>
      <Footer />
    </div>
  )
}



