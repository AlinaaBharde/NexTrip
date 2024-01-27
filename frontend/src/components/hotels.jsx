import React, { useState } from 'react';
import { Button, Label, Card, Rating, Pagination, Radio, Spinner } from 'flowbite-react';
import { FaFilter } from "react-icons/fa";
import { MdAdd, MdRemove } from "react-icons/md";
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { searchHotels } from '../services/hotelservices';
import hotelImg from '../images/hotel.png';



export default function Hotels({locationName, startDate, endDate, adults, index }) {
  const [filter, setfilter] = useState(false);
  const {id} = useParams();
  const planId = id ? id.toString() : '';
  const [hotels, sethotels] = useState([]);
  const [selectedhotels, setSelectedhotels] = useState([]);
  const [sortby, setsortby] = useState('PRICE');
  const { user } = useAuthContext();
  const [selectedDates, setSelectedDates] = useState({
    CheckIn: startDate,
    CheckOut: endDate
  });
  const LocationName = locationName;
  const Adults = adults;
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const onPageChange = (page) => setPageNumber(page);
  console.log(startDate);

  React.useEffect(() => {
    const FetchHotels = async () => {
      try {
        setLoading(true);
        const response = await searchHotels(LocationName,selectedDates.CheckIn,selectedDates.CheckOut,Adults)
        const updatedHotels = response.map((hotel) => ({
          ...hotel,
          add: true,
          remove: false
        }));
        sethotels(updatedHotels.slice(0,30));
        console.log(hotels);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };

    if(index === 0 && loading){
      FetchHotels();
    }
  }, [LocationName, sortby, pageNumber, Adults, selectedDates.CheckIn, selectedDates.CheckOut, index, loading,hotels]);

  function handleClick() {
    setfilter(!filter);
  }

  function renderFilter() {
    return (
      <div className='mx-auto flex flex-wrap items-center'>
        <div className="ml-5 mr-2 inline-flex gap-2">
          <Radio id="Price" name='Sort' onChange={() => setsortby('PRICE')} color='purple' />
          <Label htmlFor="sortPrice">Sort by Price</Label>
        </div>
        <div className="ml-5 mr-2 inline-flex gap-2">
          <Radio id="Rating" name='Sort' onChange={() => setsortby('RATING')} color='purple' />
          <Label htmlFor="sortRating">Sort by Rating</Label>
        </div>
        <div className='flex flex-row items-center'>
          <div className="ml-5 m-2">
            <Label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 dark:text-white">
              Check In
            </Label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              className="mt-1 p-2 border rounded-md w-full text-black"
              value={selectedDates?.CheckIn}
              min={startDate}
              max={endDate}
              onChange={(e) => handleDateChange('CheckIn', e.target.value)}
            />
          </div>
          <div className="ml-5 m-2">
            <Label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 dark:text-white">
              Check Out
            </Label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              className="mt-1 p-2 border rounded-md w-full text-black"
              value={selectedDates?.CheckOut}
              min={startDate}
              max={endDate}
              onChange={(e) => handleDateChange('CheckOut', e.target.value)}
            />
          </div>
        </div>
        <Button pill className='w-16 m-2' color='purple' onClick={handleApply}>
          Apply
        </Button>
      </div>
    );
  }

  function handleApply() {
    const FetchHotels = async () => {
      try {
        setLoading(true);
        const response = await searchHotels(LocationName,selectedDates.CheckIn,selectedDates.CheckOut,Adults,pageNumber,sortby)
        sethotels(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };

    if(index === 0 && loading){
      FetchHotels();
    }
  }

  function handleAdd(index, selectedHotel) {

    const updatedHotels = [...hotels];
    const hotel = updatedHotels[index];

    setSelectedhotels((prevSelected) => [...prevSelected, selectedHotel]);

    updatedHotels[index] = { ...hotel, add: !hotel.add, remove: !hotel.remove };
    sethotels(updatedHotels);
  }

  function handleRemove(index, selectedHotel) {

    const updatedHotels = [...hotels];

    setSelectedhotels((prevSelected) =>
      prevSelected.filter((hotel) => hotel._id !== selectedHotel._id)
    );

    const hotel = updatedHotels[index];
    updatedHotels[index] = { ...hotel, add: !hotel.add, remove: !hotel.remove };
    sethotels(updatedHotels);
  }



  function handleSave() {
    console.log("Selected Hotels:", selectedhotels);
    axios.post(
      `http://localhost:4000/api/hotels/add/${planId}`,
      JSON.stringify(selectedhotels),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      }

    )
      .then((response) => {
        console.log("Hotels saved successfully: ", response);
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
      })
  }

  const handleDateChange = (name, value) => {
    setSelectedDates((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

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

  return (
    <div >
      <div className='w-full flex-col top-0 '>
        <Button className=' text-xl ml-16 mb-5 -mt-2 font-semibold  bg-transparent hover:shadow' style={{ color: '#5F2EEA', backgroundColor: 'transparent' }} onClick={handleClick} ><FaFilter />Filter</Button>
        {
          filter ? renderFilter() : null
        }
      </div>
      <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'transparent', 'width': 'cover', 'color': '#5F2EEA' }}>Hotels</h1>
      {hotels && hotels.length === 0 ? (
        <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-2/3 bg-transparent text-indigo-700">Oops!! No Hotels Available.
        </p>
      ) : (
        <div className="grid grid-cols-1  gap-2 mt-6 mb-12 ml-10 ">
        <div className="flex justify-center mt-4 mb-4">
            <Button className="rounded-full" color="purple" onClick={handleSave}>
              Save
            </Button>
          </div>
          {hotels && hotels.map((hotel, index) => (
            <Card key={index} imgSrc={hotelImg} className="mb-6 md:max-w-4xl" horizontal>
              <h3 className="text-2xl font-bold mb-2 text-black gap-2">{hotel.name}</h3>
              <p className="font-semibold text-gray-700 dark:text-gray-400 pt-0 gap-0">{hotel.location}</p>
              <Button
                color="purple"
                className="mb-2 w-40"
                onClick={() => window.open(hotel.url, '_blank')}
              >
                Hotel Link
              </Button>
              <p className="font-normal text-gray-700 dark:text-gray-400">Price/room: {hotel.price}</p>
              <div className="flex items-center">
                <Rating>
                  <Rating.Star />
                  <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">{hotel.rating}</p>
                </Rating>
              </div>
              <div className="flex justify-between items-center mt-2 w-44">
                <Button
                  pill
                  className={`w-20 mr-2 ${hotel.add ? 'text-white': 'text-gray-300'} `}
                  color={hotel.add ? 'purple' : 'bg-gray-300'}
                  onClick={() => handleAdd(index, hotel)}
                  disabled={!hotel.add}
                >
                  <MdAdd className="h-6 w-6" />
                </Button>
                <Button
                  outline
                  pill
                  className={`w-20 ml-2 bg-purple-700 text-white`}
                  color={hotel.remove ? 'purple' : 'bg-gray-300'}
                  onClick={() => handleRemove(index, hotel)}
                  disabled={!hotel.remove}
                >
                  <MdRemove className="h-6 w-6" />
                </Button>
              </div>
            </Card>
          ))}

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
      )}
    </div>
  )
}