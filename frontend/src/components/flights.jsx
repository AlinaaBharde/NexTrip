import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Label, Card, Pagination, Radio, TextInput } from 'flowbite-react';
import { FaPlaneDeparture, FaPlaneArrival, FaPeopleGroup } from 'react-icons/fa6';
import axios from 'axios';

export default function Flights({ locationName, startDate, endDate }) {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planid = queryParams.get('planid');

  const planId = planid ? planid.toString() : '';
  const [flights, setFlights] = useState([]);
  const [dates, setDates] = useState({ start: startDate, end: endDate });
  const [classOfService, setClassOfService] = useState('ECONOMY');
  const [itineraryType, setItineraryType] = useState('ONE_WAY');
  const [arrivalCity, setArrivalCity] = useState(locationName);
  const [departureCity, setDepartureCity] = useState('');
  const [adults, setAdults] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const onPageChange = (page) => setPageNumber(page);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.post(
          'http://localhost:4000/api/flights/fetch',
          {
            departureCity,
            arrivalCity,
            itineraryType,
            classOfService,
            startDate: dates.start,
            endDate: dates.end,
            adults,
            pageNumber,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${user.token}`
            },
          }
        );
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };
    fetchFlights();
  }, [planId]);

  const handleDateChange = (name, value) => {
    setDates((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleRadioChange = (stateSetter, value) => {
    stateSetter(value);
  };

  const renderRadioGroup = (options, state, stateSetter, labelKey) => (
    <div className='border rounded-md shadow-sm flex h-10 m-3 mt-2'>
      {options.map((option) => (
        <div key={option.value} className='flex items-center gap-2 m-2'>
          <Radio
            id={option.value}
            name={labelKey}
            onChange={() => handleRadioChange(stateSetter, option.value)}
            checked={state === option.value}
            color='purple'
          />
          <Label>{option.label}</Label>
        </div>
      ))}
    </div>
  );

  const renderFilter = () => (
    <div className='mx-auto flex flex-wrap border-b-2 mb-4'>
      {renderRadioGroup(
        [
          { value: 'ECONOMY', label: 'Economy' },
          { value: 'BUISNESS', label: 'Business' },
          { value: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
          { value: 'FIRST', label: 'First' },
        ],
        classOfService,
        setClassOfService,
        'ClassofService'
      )}

      {['departure', 'arrival'].map((type) => (
        <div key={type} className={`flex items-center ml-4 m-2`}>
          <Label htmlFor={`${type}City`} className='text-sm font-medium text-gray-700 dark:text-white'>
            {type === 'departure' ? <FaPlaneDeparture className='mx-auto' /> : <FaPlaneArrival className='mx-auto' />}
            {type === 'departure' ? 'Departure' : 'Arrival'} City
          </Label>
          <TextInput
            id={`${type}City`}
            type='text'
            placeholder={`${type.charAt(0).toUpperCase()}${type.slice(1)} City`}
            className='w-40 m-2 mt-0 h-6 border rounded-md text-md shadow-lg'
            value={type === 'departure' ? departureCity : arrivalCity}
            onChange={(e) => (type === 'departure' ? setDepartureCity(e.target.value) : setArrivalCity(e.target.value))}
            required
          />
        </div>
      ))}

      {['start', 'end'].map((name) => (
        <div key={name} className='flex items-center ml-4 m-2'>
          <Label htmlFor={`${name}Date`} className='text-sm font-medium text-gray-700 dark:text-white'>
            Date
          </Label>
          <input
            type='date'
            id={`${name}Date`}
            name={`${name}Date`}
            className='m-2 p-2 border rounded-md w-36'
            value={dates[name]}
            min={startDate}
            max={endDate}
            onChange={(e) => handleDateChange(name, e.target.value)}
          />
        </div>
      ))}

      {renderRadioGroup(
        [
          { value: 'ONE_WAY', label: 'One Way' },
          { value: 'ROUND_TRIP', label: 'Round Trip' },
        ],
        itineraryType,
        setItineraryType,
        'ItenaryType'
      )}

      <div className='flex items-center ml-4 m-2'>
        <Label htmlFor='numberOfPeople' className='text-sm font-medium text-gray-700 dark:text-white'>
          <FaPeopleGroup />
          Adults
        </Label>
      </div>
      <input
        id='groupSize'
        type='number'
        placeholder='adults'
        className='m-2 mt-4 p-2 border rounded-md text-md shadow h-8 w-14'
        defaultValue={1}
        min={1}
        name='numberOfPeople'
        value={adults}
        onChange={(e) => setAdults(e.target.value)}
        required
      />
      <Button pill className='w-16 ml-2 h-10 m-4' color='purple' onClick={handleApply}>
        Apply
      </Button>
    </div>
  );

  const handleApply = (event) => {
    event.preventDefault();
    console.log(departureCity, arrivalCity, itineraryType, classOfService, dates.start, dates.end, adults, pageNumber);
    axios
      .post(
        'http://localhost:4000/api/flights/fetch/',
        {
          departureCity,
          arrivalCity,
          itineraryType,
          classOfService,
          startDate: dates.start,
          endDate: dates.end,
          adults,
          pageNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error('Error submitting filter:', error);
        if (error) {
          console.error('Server responded with:', error.data);
        } else if (error.request) {
          console.error('No response received');
        } else {
          console.error('Error setting up the request:', error.message);
        }
      });
  };

  const renderFlightCards = () => (
    <div>
      <ul className='bg-white'>
        {flights.map((flight, index) => (
          <div key={index} className=''>
            <Card className='md:max-w-4xl mr-4 ml-12 mt-6 mb-6' imgSrc={flight.logo} horizontal>
              <h3 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{flight.airline}</h3>
              <p className='font-semibold text-gray-700 dark:text-gray-400'>
                {flight.departureTime} - {flight.arrivalTime}
              </p>
              <p className='font-normal text-gray-700 dark:text-gray-400'>Class of Service: {flight.classOfService}</p>
              <p className='font-normal text-gray-700 dark:text-gray-400'>
                Book: <a href={flight.purchaseUrl}>{flight.purchaseUrl}</a>
              </p>
              <p className='font-normal text-gray-700 dark:text-gray-400'>Price: {flight.totalPrice}</p>
            </Card>
          </div>
        ))}
      </ul>
      <div className='flex overflow-x-auto ml-20 md:justify-center'>
        <Pagination layout='navigation' currentPage={pageNumber} onPageChange={onPageChange} onClick={handleApply} showIcons />
      </div>
    </div>
  );

  return (
    <div className=''>
      <div className='w-full flex-col top-0'>{renderFilter()}</div>
      <h1 className='pl-12 top-0 font-bold text-7xl rounded-md underline' style={{ backgroundColor: 'white', width: 'cover' }}>
        Flights
      </h1>
      {flights.length === 0 ? (
        <p className='ml-10 container border rounded-md shadow bg-white p-6 pl-12 mt-6 mb-12 font-bold text-7xl w-fit'>
          Oops!! No Flights Available.
        </p>
      ) : (
        renderFlightCards()
      )}
    </div>
  );
}

