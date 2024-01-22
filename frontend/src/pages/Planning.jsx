import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs } from 'flowbite-react';
import { IoMdRestaurant } from "react-icons/io";
import { FaHotel, FaPlane, FaRegNewspaper } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import Hotels from '../components/hotels';
import Restaurants from '../components/restaurants';
import Places from '../components/places';
import Flights from '../components/flights';
import News from '../components/News';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export default function SpecificPlan() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [selectedDates, setSelectedDates] = useState(null);
  const [locationName, setlocationName] = useState(null);
  const [loading, setLoading] = useState(true)
  const [adults, setAdults] = useState(1);

  React.useEffect(() => {

    const fetchTravelDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:4000/api/planningpage/fetch/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`,
            }
          },
        );
        const startDate = response.data.StartDate;
        const endDate = response.data.EndDate;
        const City = response.data.City;
        const adults = response.data.Adults;
        setSelectedDates({ startDate, endDate });
        setlocationName(City);
        setAdults(adults);
        setLoading(false)
        console.log("City", City)
      } catch (error) {
        console.error('Error fetching travel plans:', error);
        setLoading(false)
      }
    };

    fetchTravelDetails();
  }, [id, loading]);

  if (loading || !selectedDates || !locationName) {
    return (<div>Loading...</div>)
  }

  return (
    <div>
      <Navbar />
      <Tabs aria-label="Tabs with icons" style="underline" className=' mt-12 mx-auto relative shadow-md' >
        <Tabs.Item title="Hotels" icon={FaHotel}  >
          <Hotels locationName={locationName} startDate={selectedDates.checkIn} endDate={selectedDates.checkOut} planid={id} adults={adults} />
        </Tabs.Item>
        <Tabs.Item title="Restaurants" icon={IoMdRestaurant} >
          <Restaurants locationName={locationName} planid={id} />
        </Tabs.Item>
        <Tabs.Item title="Places" icon={MdPlace} >
          <Places locationName={locationName} planid={id} />
        </Tabs.Item>
        <Tabs.Item title="Flights" icon={FaPlane} >
          <Flights locationName={locationName} startDate={selectedDates.checkIn} endDate={selectedDates.checkOut} planid={id} />
        </Tabs.Item>
        <Tabs.Item title="Latest News" icon={FaRegNewspaper}   >
          <News locationName={locationName} />
        </Tabs.Item>
      </Tabs>
      <Footer />
    </div>
  )
}





