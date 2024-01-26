import React,{useState} from 'react';
import { Tabs } from 'flowbite-react';
import { IoMdRestaurant } from "react-icons/io";
import { FaHotel, FaPlane, FaRegNewspaper } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { useParams } from 'react-router-dom';
import Hotels from '../components/hotels';
import Restaurants from '../components/restaurants';
import Places from '../components/places';
import Flights from '../components/flights';
// import News from '../components/News';
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
    checkin : null,
    checkout : null
  }
  );
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
        const startDate = response.data.startDate;
        const endDate = response.data.endDate;
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

    fetchTravelDetails();
  }, [id]);

  if (loading || !selectedDates || !locationName) {
    return (<div>Loading...</div>)
  }

  return (
    <div className=' w-screen h-full bg-gradient-to-br from-cyan-100 via-white to-gray-300 background-animate'>
      <NavbarComponent />
      <Tabs aria-label="Tabs with icons" style="underline" className=' mt-12 mx-auto relative shadow-m ' onActiveTabChange={(tab) => setActiveTab(tab)} >
        <Tabs.Item icon={FaHotel}>
          <Hotels locationName={locationName} startDate={selectedDates.checkin} endDate={selectedDates.checkout} adults={adults} index={activeTab} />
        </Tabs.Item>
        <Tabs.Item icon={IoMdRestaurant}>
          <Restaurants locationName={locationName} index={activeTab}/>
        </Tabs.Item>
        <Tabs.Item icon={MdPlace}>
          <Places locationName={locationName} index={activeTab} />
        </Tabs.Item>
        <Tabs.Item icon={FaPlane}>
          <Flights locationName={locationName} index={activeTab} startDate={selectedDates.checkin} endDate={selectedDates.checkout} adults={adults} />
        </Tabs.Item>
        <Tabs.Item icon={FaRegNewspaper}>
          <Events locationName={locationName} index={activeTab} />
        </Tabs.Item>
      </Tabs>
      <Footer />
    </div>
  )
}


