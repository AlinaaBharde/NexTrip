import React, { useState } from 'react';
import { Button, Label, Card, Pagination, Radio } from 'flowbite-react';
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa6";
import { FaPeopleGroup } from 'react-icons/fa6';
import axios from 'axios';
import Select from 'react-select';
import Cities from './cities.json';
import {useParams} from 'react-router-dom';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import SpecificPlanTabs from '../pages/Planning';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Flights(){
  const {id} = useParams();
  const planId = id ? id.toString() : '';
  const [flights, setflights] = useState([]);
  const { user } = useAuthContext();
  const [selectedDates, setSelectedDates] = useState({
    CheckIn: null,
    CheckOut: null
  });
  const [loading, setLoading] = useState(true)
  const [classOfService, setservice] = useState('Economy');
  const [itenaryType , setType] = useState('One-Way');
  const [arrivalCity, setarrivalCity] = useState({
    value: null,
    label: null,
  });
  const [departureCity, setdepartureCity] = useState({
    value: null,
    label: null,
  });
  const [Adults, setadults] = useState(1);
  const [pageNumber, setPageNumber] = useState();

  const onPageChange = (page) => setPageNumber(page);

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
        setarrivalCity(City);
        setadults(adults);
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

  React.useEffect(() => {
  

    const FetchFlights = () => {
      try {
        axios.post(
          `http://localhost:8000/api/flights/fetch`,
          JSON.stringify(departureCity,arrivalCity,itenaryType,classOfService, dates,Adults, pageNumber),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setflights(response.data);
        })
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };


    
    FetchFlights();
  }, [planId]);

  const handleDateChange = (name, value) => {
    setDates((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };


  function renderFilter() {
    return (
      <div className="mx-auto flex flex-wrap border-b-2 mb-4">
        <div className=' border rounded-md shadow-sm flex h-10 m-3 mt-2'>
        <div className="flex items-center gap-2 m-2">
          <Radio id="Economy" name="ClassofService" onChange={() => setservice('ECONOMY')} checked color="purple" />
          <Label>Economy</Label>
        </div>
        <div className="flex items-center gap-2 m-2">
          <Radio id="Business" name="ClassofService" onChange={() => setservice('BUISNESS')} color="purple" />
          <Label >Business </Label>
        </div>
        <div className="flex items-center gap-2 m-2">
          <Radio id="PremiumEco" name="ClassofService" onChange={() => setservice('PREMIUM_ECONOMY')} color="purple" />
          <Label >Premium Economy </Label>
        </div>
        <div className="flex items-center gap-2 m-2">
          <Radio id="First" name="ClassofService" onChange={() => setservice('FIRST')} color="purple" />
          <Label >First </Label>
        </div>
        </div>
        <div className="flex items-center ml-4 m-2">
            <Label htmlFor="departureCity" className="text-sm font-medium text-gray-700 dark:text-white">
            <FaPlaneDeparture className='mx-auto' />Departure City 
            </Label>
            <Select
            options={Cities}
            className="w-40 m-2 mt-0 h-6 border rounded-md text-md shadow-lg"
            value={departureCity}
            onChange={(selectedOption) => setdepartureCity(selectedOption)}
            required
            />
        </div>
        <div className="flex items-center ml-4 m-2">
            <Label htmlFor="arrivalCity" className="text-sm font-medium text-gray-700 dark:text-white">
            <FaPlaneArrival className='mx-auto' /> Arrival City
            </Label>
            <Select
            options={Cities}
            className="w-40 m-2 mt-0 h-6 border rounded-md text-md shadow"
            value={arrivalCity}
            onChange={(selectedOption) => setarrivalCity(selectedOption)}
            required
            />
        </div>
        <div className="flex items-center ml-4 m-2">
          <Label htmlFor="checkOut" className="text-sm font-medium text-gray-700 dark:text-white">
            Date
          </Label>
          <input
            type="date"
            id="date"
            name="date"
            className=" m-2 p-2 border rounded-md w-36"
            value={dates?.start}
            min={startDate}
            max={endDate}
            onChange={(e) => handleDateChange('start',e.target.value)}
          />
        </div>
        <div className="flex items-center ml-4 m-2">
          <Label htmlFor="checkOut" className="text-sm font-medium text-gray-700 dark:text-white">
            Date
          </Label>
          <input
            type="date"
            id="date"
            name="date"
            className=" m-2 p-2 border rounded-md w-36"
            value={dates?.end}
            min={startDate}
            max={endDate}
            onChange={(e) => handleDateChange('end',e.target.value)}
          />
        </div>
        <div className=' border rounded-md shadow-sm flex h-10 ml-3 mr-3 mt-2 mb-0'>
        <div className="flex items-center gap-2 m-2 ">
          <Radio id="OneWay" name="ItenaryType" onChange={() => setType('One-Way')} checked color='purple' />
          <Label htmlFor="sortPrice">One Way</Label>
        </div>
        <div className="flex items-center gap-2 m-2">
          <Radio id="RoundTrip" name="ItenaryType" onChange={() => setType('RoundTrip')} color='purple' />
          <Label htmlFor="sortRating">Round Trip </Label>
        </div>
        </div>
        <div className="flex items-center ml-4 m-2">
            <Label htmlFor="numberOfPeople"  className='text-sm font-medium text-gray-700 dark:text-white'><FaPeopleGroup />Adults</Label>
          </div>
          <input id="groupSize" type="number" placeholder="adults" className='m-2 mt-4 p-2 border rounded-md text-md shadow h-8 w-14' defaultValue={1} min={1} name='numberOfPeople' value={Adults} onChange={(e) =>setadults(e.target.value) } required />
        <Button pill className="w-16 ml-2 h-10 m-4" color="purple" onClick={handleApply}>
          Apply
        </Button>
      </div>
    );
  }
  
  

  const handleApply=  (event) => {
    event.preventDefault();
    console.log(departureCity.value,arrivalCity.value,itenaryType,classOfService,...dates,adults, pageNumber);
    axios.post(
      `http://localhost:8000/api/flights/fetch/`,
      JSON.stringify(departureCity,arrivalCity,itenaryType,classOfService, ...dates,adults, pageNumber),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      setflights(response.data);
    })
    .catch((error)=>{
      console.error('Error submitting filter:', error);
      if (error) {
        
        console.error('Server responded with:', error.data);
      } else if (error.request) {
        console.error('No response received');
      } else {
        console.error('Error setting up the request:', error.message);
      } 
    } )
  }
  

  return (
    <div >
    <NavbarComponent />
    <SpecificPlanTabs />
    <div className='w-full flex-col top-0 '>
      {
        renderFilter()
      } 
    </div>
    <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'white', 'width': 'cover' }}>Flights</h1>
            {flights.length === 0 ? (
                <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-fit">Oops!! No Flights Available.
                </p>
            ) : (
                <div>
                <ul className='bg-white'>
                    {flights.map((flight, index) => (
                    <div key={index} className=''>
                        <Card className="md:max-w-4xl mr-4 ml-12 mt-6 mb-6" imgSrc={flight.logo} horizontal>
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{flight.airline}</h3>
                        <p className="font-semibold text-gray-700 dark:text-gray-400">{flight.departureTime} - {flight.arrivalTime}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Class of Service: {flight.classOfService}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Book: <a href={flight.purchaseUrl}>{flight.purchaseUrl}</a></p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Price/room: {flight.totalPrice}</p>
                        </Card>
                    </div>
                    ))}
                </ul>
                <div className="flex overflow-x-auto ml-20 md:justify-center">
                    <Pagination
                    layout="navigation"
                    currentPage={pageNumber}
                    onPageChange={onPageChange}
                    onClick={handleApply}
                    showIcons
                    />
                </div>
                </div>

                )
              }
      <Footer />
    </div>
  )
}
