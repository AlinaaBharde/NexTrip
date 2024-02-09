import React, { useState } from 'react';
import { Tabs, Spinner } from 'flowbite-react';
import { IoMdRestaurant } from "react-icons/io";
import { FaHotel, FaPlane, FaRegNewspaper } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { useParams } from 'react-router-dom';
import Hotels from '../components/hotels';
import Restaurants from '../components/restaurants';
import Places from '../components/places';
import Flights from '../components/flights';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import Events from '../components/Events';
import '../styles/colorgradient.css';


export default function SpecificPlan() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null
  }
  );
  const [locationName, setlocationName] = useState(null);
  const [loading, setLoading] = useState(true)
  const [adults, setAdults] = useState(1);



  React.useEffect(() => {

    const fetchTravelDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://nextrip-api.onrender.com/api/planningpage/fetch/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`,
            }
          },
        );
        const startDate = response.data.startDate.split('T')[0];
        console.log(startDate);
        const endDate = response.data.endDate.split('T')[0];
        const City = response.data.City;
        const adults = response.data.adults;
        setSelectedDates({ startDate, endDate });
        setlocationName(City);
        setAdults(adults);
        setLoading(false);
        console.log("City", City)
      } catch (error) {
        console.error('Error fetching travel plans:', error);

        setLoading(false)
      }
    };

    if (!selectedDates || !locationName) {
      fetchTravelDetails();
    }
  }, [id, loading]);

  if (loading || !selectedDates || !locationName) {
    return (
      <div className='h-screen w-screen flex items-center justify-center fixed top-0 left-0'>
        <div className="flex items-center justify-center text-black">
          <Spinner aria-label="Default status example" size='xl' color='purple' />
          Loading
        </div>
      </div>
    );
  }


  return (
    <div className=' w-screen h-full bg-white overflow-hidden'>
      <NavbarComponent />
      <Tabs aria-label="Tabs with icons" style="underline" className=' mt-12 mx-auto relative shadow-m ' onActiveTabChange={(tab) => setActiveTab(tab)} >
        <Tabs.Item icon={FaHotel} title='Hotels'>
          <Hotels locationName={locationName} startDate={selectedDates.startDate} endDate={selectedDates.endDate} adults={adults} index={activeTab} />
        </Tabs.Item>
        <Tabs.Item icon={IoMdRestaurant} title='Restaurants'>
          <Restaurants locationName={locationName} index={activeTab} />
        </Tabs.Item>
        <Tabs.Item icon={MdPlace} title='Places'>
          <Places locationName={locationName} index={activeTab} />
        </Tabs.Item>
        <Tabs.Item icon={FaPlane} title='Flights'>
          <Flights locationName={locationName} index={activeTab} startDate={selectedDates.startDate} endDate={selectedDates.endDate} adults={adults} />
        </Tabs.Item>
        <Tabs.Item icon={FaRegNewspaper} title='News/Events'>
          <Events locationName={locationName} index={activeTab} />
        </Tabs.Item>
      </Tabs>
      <Footer />
    </div>
  )
}


