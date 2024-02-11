import React, { useState, useRef, useEffect } from 'react';
import { Button, Label, Card, Pagination, Radio, Spinner } from 'flowbite-react';
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa6";
import { IoAirplane } from "react-icons/io5";
import Select from 'react-select';
import Cities from './cities.json';
import { fetchFlightsFromAPI } from '../services/flightservices';
import srcimg from '../images/flight.jpg';

export default function Flights({ locationName, startDate, endDate, adults, index }) {
  const [flights, setflights] = useState([]);

  const [selectedDates, setSelectedDates] = useState({
    start: startDate,
    end: endDate
  });
  const [classOfService, setservice] = useState('ECONOMY');
  const [itenaryType, setType] = useState('ONE_WAY');
  const [arrivalCity, setarrivalCity] = useState({
    value: locationName,
    label: locationName,
  });
  const [departureCity, setdepartureCity] = useState({
    value: 'Delhi',
    label: "Delhi",
  });
  const [Adults, setadults] = useState(adults);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const onPageChange = (page) => {
    setPageNumber(page);
    FetchFlights();
  };

  const popupRef = useRef(null);

  const FetchFlights = async () => {
    try {
      setLoading(true);
      console.log(departureCity.value, arrivalCity.value, itenaryType, classOfService, Adults, pageNumber, selectedDates.start, selectedDates.end)
      const response = await fetchFlightsFromAPI(departureCity.value, arrivalCity.value, selectedDates.start, selectedDates.end, itenaryType, classOfService, Adults)
      setflights(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching travel plans:', error);
      setLoading(false)
    }
  };

  React.useEffect(() => {
    if (index === 3 && loading) {
      FetchFlights();
    }
  }, [pageNumber, index, loading, locationName, departureCity, arrivalCity, itenaryType, classOfService, Adults, selectedDates.start, selectedDates.end]);

  const handleDateChange = (name, value) => {
    setSelectedDates((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggle = () => setOpen(!open);

  if (loading) {
    return (
      <div className='h-screen w-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-gray-300 background-animate fixed top-0 left-0'>
        <div className="flex items-center justify-center text-black">
          <Spinner aria-label="Default status example" size='xl' color='purple' />
          Loading
        </div>
      </div>
    );
  }

  function RenderFilter() {
    return (
      <div>
        <div className='mx-auto mt-4 flex flex-wrap justify-center items-center w-full rounded-sm backdrop-filter backdrop-blur-lg bg-opacity-10 bg-[#f5f5f5] dark:bg-gray-800 p-4'>
          <div className='flex flex-wrap justify-left items-center w-full'>
            <div className="flex items-start gap-2 m-2 ">
              <Radio id="OneWay" name="ItenaryType" onChange={() => setType('ONE_WAY')} checked color='purple' />
              <Label htmlFor="sortPrice" className='text-white'>One Way</Label>
            </div>
            <div className="flex items-start gap-2 m-2">
              <Radio id="RoundTrip" name="ItenaryType" onChange={() => setType('ROUND_TRIP')} color='purple' />
              <Label htmlFor="sortRating" className='text-white'>Round Trip </Label>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row w-full'>
            <div className="flex items-start flex-col w-full">
              <Label htmlFor="departureCity" className="text-sm font-bold text-white flex items-center">
                <FaPlaneDeparture className='mx-auto' />From
              </Label>
              <Select
                options={Cities}
                className="border rounded-md text-black w-full"
                value={departureCity}
                onChange={(selectedOption) => setdepartureCity(selectedOption)}
                required
              />
            </div>
            <div className="flex items-start flex-col w-full" >
              <Label htmlFor="arrivalCity" className="text-sm font-bold text-white flex items-center">
                <FaPlaneArrival className='mx-auto' /> To
              </Label>
              <Select
                options={Cities}
                className="border rounded-md text-black w-full"
                value={arrivalCity}
                onChange={(selectedOption) => setarrivalCity(selectedOption)}
                required
              />
            </div>
            <div className="flex items-start flex-col w-full">
              <Label htmlFor="checkOut" className="text-sm font-bold text-white flex items-center">
                Depart Date
              </Label>
              <input
                type="date"
                id="date"
                name="date"
                className="border rounded-md text-black w-full"
                value={selectedDates?.start}
                min={startDate}
                max={endDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </div>
            <div className="flex items-start flex-col w-full">
              <Label htmlFor="checkOut" className="text-sm font-bold text-white flex items-center">
                Return Date
              </Label>
              <input
                type="date"
                id="date"
                name="date"
                disabled={itenaryType == 'ROUND_TRIP' ? false : true}
                className="border rounded-md w-full text-black dark:text-white"
                value={selectedDates?.end}
                min={startDate}
                max={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </div>
            <div className="flex items-start w-full flex-col">
              <Label htmlFor="Custom" className="text-sm font-bold text-white">
                Travellers and cabin class
              </Label>
              <div className='relative w-full' ref={popupRef}>
                <div onClick={toggle} className=" text-black p-2 py-2 px-4 rounded cursor-pointer bg-white flex flex-row items-center border">
                  {`${Adults} adults, ${classOfService.toLowerCase()}` || 'Select Service'}
                  <svg className="w-[15px] h-[15px] text-gray-800 dark:text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M18.4 10.3A2 2 0 0 0 17 7H7a2 2 0 0 0-1.5 3.3l4.9 5.9a2 2 0 0 0 3 0l5-6Z" clip-rule="evenodd" />
                  </svg>
                </div>
                {open && (
                  <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded shadow-lg text-center">
                    <Label className='items-center font-bold'>Cabin Class
                      <div className='shadow-sm flex flex-row h-10 m-3 mt-2'>
                        <div className="flex items-center gap-2 m-2">
                          <Radio id="Economy" name="ClassofService" onChange={() => setservice('ECONOMY')} color="purple" />
                          <Label>Economy</Label>
                        </div>
                        <div className="flex items-center gap-2 m-2">
                          <Radio id="Business" name="ClassofService" onChange={() => setservice('BUSINESS')} color="purple" />
                          <Label >Business </Label>
                        </div>
                      </div>
                      <div className='shadow-sm flex flex-row h-10 m-3 mt-2'>
                        <div className="flex items-center gap-2 m-2">
                          <Radio id="PremiumEco" name="ClassofService" onChange={() => setservice('PREMIUM_ECONOMY')} color="purple" />
                          <Label >Premium Economy </Label>
                        </div>
                        <div className="flex items-center gap-2 m-2">
                          <Radio id="First" name="ClassofService" onChange={() => setservice('FIRST')} color="purple" />
                          <Label >First </Label>
                        </div>
                      </div>
                    </Label>
                    <div className="flex flex-col justify-center items-center">
                      <label htmlFor="numberOfPeople" className='text-sm font-bold text-gray-700 dark:text-white'>Adults</label>
                      <div className="flex items-center justify-center">
                        <button className="flex items-center justify-center w-8 h-8 bg-[#e0e3e5] rounded-l-md hover:bg-gray-300" onClick={() => setadults(Math.max(1, Adults - 1))}>
                          <span className='font-bold text-black'>-</span>
                        </button>
                        <input
                          id="groupSize"
                          type="number"
                          placeholder="adults"
                          className='flex justify-center m-2 p-2 border rounded-md text-md shadow w-14 h-8 text-black text-center'
                          defaultValue={adults}
                          min={1}
                          name='numberOfPeople'
                          value={Adults}
                          onChange={(e) => setadults(e.target.value)}
                          required
                        />
                        <button className="flex items-center justify-center w-8 h-8 bg-[#e0e3e5] rounded-r-md hover:bg-gray-300" onClick={() => setadults(parseInt(Adults) + 1)}>
                          <span className='font-bold text-black'>+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full sm:w-auto justify-center align-middle items-center">
              <Button className="w-20 ml-2 h-12 m-4" gradientDuoTone="purpleToPink" onClick={handleApply}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function RenderFilterCard() {
    return (
      <div className='relative flex items-center justify-center w-screen' >
        <Card className='bg-cover bg-center h-64 relative rounded-lg w-full sm:mt-auto mt-[165px]' style={{ backgroundImage: `url(${srcimg})` }}>
          <div className="bg-opacity-30 inset-0 bg-black rounded-xl">
            <div className="flex flex-col items-center justify-center relative z-10">
              <div className="text-white text-center font-mono text-7xl sm:text-5xl">The best flight offers from anywhere, to everywhere</div>
              <div className="flex items-center justify-center pb-4">
                {RenderFilter()}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }



  const handleApply = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(departureCity.value, arrivalCity.value);
    if (index === 3) {
      await FetchFlights();
      setLoading(false);
    }
  }


  return (
    <div>
      <div className='w-full flex-col top-0 '>
        {
          RenderFilterCard()
        }
      </div>
      {flights && flights.length === 0 ? (
        <p className="ml-10 container border rounded-md shadow p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-2/3 bg-transparent text-indigo-700">Sorry, No Flights Available.
        </p>
      ) : (
        <div className='grid grid-cols-1 gap-2 sm:mt-10 mb-12 ml-10 mt-[175px] '>
          <div>
            {flights && flights.map((flight, index) => (
              <Card key={index} className="bg-white flex flex-col rounded shadow-lg flex-grow w-full mx-auto m-2">
                <div className='flex flex-row items-baseline flex-nowrap bg-gray-100'>
                  <p className="ml-0 font-normal text-gray-500">{selectedDates.start}</p>
                </div>
                <div className='m-0 flex justify-start bg-white p-0'>
                  <div className='flex mx-2 ml-0 px-2 flex-row items-baseline rounded-full bg-gray-100'>
                    <p className='font-normal ml-0 text-gray-500'>{flight.classOfService}</p>
                  </div>
                </div>
                <div className="m-0 p-0 flex sm:flex-row mx-1 sm:justify-between flex-wrap w-full items-center justify-center align-middle">
                  <div className='flex flex-col place-items-center p-0 mr-5'>
                    <img src={flight.logo} alt={flight.airline} className="w-15 h-15 p-0" />
                    <div className='flex flex-col ml-0'>
                      <p className='text-base text-gray-500 font-bold'>{flight.airline}</p>
                    </div>
                  </div>
                  <div className='flex flex-row items-center p-0 m-0'>
                    <div className='flex flex-col'>
                      <p className="font-bold text-gray-500 text-7xl">{flight.departureTime.slice(11, 16)}</p>
                      <p className='text-gray-500 text-xl'>
                        {departureCity.value}
                      </p>
                    </div>
                    <div className="flex flex-grow items-center justify-center p-0 m-0">
                      <IoAirplane className='text-black sm:mx-[50px] mx-[20px]' style={{ fontSize: '30px' }} />
                    </div>
                    <div className='flex flex-col p-1 text-7xl'>
                      <p className="font-bold text-gray-500">{flight.arrivalTime.slice(11, 16)}</p>
                      <p className='text-gray-500 text-xl'>
                        {arrivalCity.value}
                      </p>
                    </div>
                  </div>
                  <div className='md:border-l-2 mx-6 md:border flex flex-row flex-wrap align-middle justify-center'>
                    <div className=' mx-6  flex flex-col py-4 mr-6 flex-wrap text-center p-5'>
                      <div className='text-sm mx-2 flex flex-col'>
                        <p className='font-bold text-black text-5xl py-2'> ₹ {flight.totalPrice}</p>
                      </div>
                      <Button className='w-32 h-11 rounded flex border-solid border text-white bg-green-800 mx-2 justify-center place-items-center font-[400] text-[40px]'
                        onClick={() => {
                          window.open(flight.purchaseUrl, '_blank');
                        }} gradientDuoTone="greenToBlue"
                      >Book<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                        </svg></Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center align-middle items-center">
            <Button disabled={pageNumber === 1} onClick={() => onPageChange(pageNumber - 1)} className='rounded m-5' gradientDuoTone="greenToBlue">Previous</Button>
            <Button onClick={() => onPageChange(pageNumber + 1)} className='rounded' gradientDuoTone="greenToBlue">Next</Button>
            {console.log("Page Number:", pageNumber)}
          </div>
        </div>
      )
      }
    </div>
  )
}
