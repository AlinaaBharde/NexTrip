import React from 'react';
import { Tabs } from 'flowbite-react';
import { IoMdRestaurant } from "react-icons/io";
import { FaHotel, FaPlane, FaRegNewspaper } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { useParams, Link , useLocation } from 'react-router-dom';


export default function SpecificPlanTabs() {
  // const { user } = useAuthContext();
  // const { id } = useParams();
  // const location = useLocation();
  // const [selectedDates, setSelectedDates] = useState(null);
  // const [locationName, setlocationName] = useState(null);
  // const [loading, setLoading] = useState(true)
  // const [adults, setAdults] = useState(1);
  


  // React.useEffect(() => {

  //   const fetchTravelDetails = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await axios.get(`http://localhost:4000/api/planningpage/fetch/${id}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Authorization": `Bearer ${user.token}`,
  //           }
  //         },
  //       );
  //       const startDate = response.data.StartDate;
  //       const endDate = response.data.EndDate;
  //       const City = response.data.City;
  //       const adults = response.data.Adults;
  //       setSelectedDates({ startDate, endDate });
  //       setlocationName(City);
  //       setAdults(adults);
  //       setLoading(false);
  //       console.log("City", City)
  //     } catch (error) {
  //       console.error('Error fetching travel plans:', error);
  //       setLoading(false)
  //     }
  //   };

  //   fetchTravelDetails();
  // }, [id, loading]);

  // if (loading || !selectedDates || !locationName) {
  //   return (<div>Loading...</div>)
  // }

  return (
    <div>

      <Tabs aria-label="Tabs with icons" style="underline" className=' mt-12 mx-auto relative shadow-md' >
        <Tabs.Item>
          <Link to={`/plan/hotels/${id}`} >
            <FaHotel />
            <span>Hotels</span>
          </Link>
        </Tabs.Item>
        <Tabs.Item>
          <Link to={`/plan/restaurants/${id}`} >
            <IoMdRestaurant />
            <span>Restaurants</span>
          </Link>
        </Tabs.Item>
        <Tabs.Item>
          <Link to={`/plan/places/${id}`} >
            <MdPlace />
            <span>Places</span>
          </Link>
        </Tabs.Item>
        <Tabs.Item>
          <Link to={`/plan/flights/${id}`} >
            <FaPlane />
            <span>Flights</span>
          </Link>
        </Tabs.Item>
        <Tabs.Item>
          <Link to={`/plan/news/${id}`} >
            <FaRegNewspaper />
            <span>Latest News</span>
          </Link>
        </Tabs.Item>
      </Tabs>

    </div>
  )
}