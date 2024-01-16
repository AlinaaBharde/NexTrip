import React, { useState } from 'react';
import { Button, Label, Card, Rating, Pagination, Radio } from 'flowbite-react';
import { FaFilter } from "react-icons/fa";
import { MdAdd,MdRemove } from "react-icons/md";
import axios from 'axios';


export default function Hotels({locationName,startDate,endDate,planid}){
  const [filter, setfilter] = useState(false);
  const planId = planid ? planid.toString() : '';
  const [hotels, sethotels] = useState([]);
  const [selectedhotels, setSelectedhotels] = useState([]);
  const [selectedDates, setSelectedDates] = useState({
    CheckIn: startDate,
    CheckOut: endDate,
  });
  const [sortby, setsortby] = useState('');

  const [pageNumber, setPageNumber] = useState(1);

  const onPageChange = (page) => setPageNumber(page);

  

  React.useEffect(() => {
  

    const FetchHotels = () => {
      try {
        axios.get(
          `http://localhost:8000/hotels`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          sethotels(response.data);
        })
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };


    
    FetchHotels();
  }, [planId]);

  function handleClick(){
    setfilter(!filter);
  }


  function renderFilter(){
    return(
      <div className=' mx-auto'>
      <div className=" ml-5 mr-2 inline-flex gap-2">
        <Radio id="Price" name='Sort' onChange={() => setsortby('price')} color='purple'/>
        <Label htmlFor="sortPrice">Sort by Price</Label>
      </div>
      <div className=" ml-5 mr-2 inline-flex gap-2">
        <Radio id="Rating" name='Sort' onChange={() =>setsortby('rating')} color='purple'/>
        <Label htmlFor="sortRating">Sort by Rating </Label>
      </div>
      <div className='flex flex-row'>
      <div className="ml-5 m-2">
        <Label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 dark:text-white">
          Check In
        </Label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          className="mt-1 p-2 border rounded-md w-full"
          value={selectedDates?.CheckIn}
          min={startDate}
          max={endDate}
          onChange={(e)=> handleDateChange('CheckIn', e.target.value)}
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
          className="mt-1 p-2 border rounded-md w-full"
          value={selectedDates?.CheckOut}
          min={startDate}
          max={endDate}
          onChange={(e)=>handleDateChange('CheckOut', e.target.value)}
        />
      </div>
      </div>
      <Button pill className=' w-16 ml-36' color='purple' onClick={handleApply}  >
        Apply
      </Button>
    </div>
    )
  }

  

  function handleAdd(index,selectedhotel) {
    
    sethotels((prevHotels) =>
      prevHotels.map((hotel, i) =>
        i === index
          ? { ...hotel, add: !hotel.add, remove: !hotel.remove }
          : hotel
      )
    );
    setSelectedhotels(prevSelected => [...prevSelected, selectedhotel])

  }

  function handleRemove(index, selectedhotel) {

    sethotels((prevHotels) =>
      prevHotels.map((hotel, i) =>
        i === index
          ? { ...hotel, add: !hotel.add, remove: !hotel.remove }
          : hotel
      )
    );
  
    
    setSelectedhotels((prevSelected) =>
      prevSelected.filter((hotel) => hotel.id !== selectedhotel.id)
    );
  }
  

  function handleSave() {
    console.log("Selected Hotels:", selectedhotels);
    const response = axios.post(
      `http://localhost:8000/plan/save/${planId}`,
      JSON.stringify(selectedhotels),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }

    )
    .then((response) => {
      console.log("Hotels saved successfully: ",  response);
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


  
  

  const handleDateChange = (name, value) => {
    setSelectedDates((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleApply=  (event) => {
    event.preventDefault();
    
    axios.post(
      `http://localhost:8000/plan/${planId}`,
      JSON.stringify(locationName,sortby, ...selectedDates, pageNumber),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      sethotels(response.data);
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
    <div className=''>
    <div className='w-full flex-col top-0 '>
      <Button className=' text-xl ml-16 mb-5 -mt-2 font-semibold  bg-transparent hover:shadow' style={{color: '#5F2EEA', backgroundColor: 'white'}} onClick={handleClick} ><FaFilter />Filter</Button>
      {
        filter? renderFilter() : null 
      } 
    </div>
    <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'white', 'width': 'cover' }}>Hotels</h1>
            {hotels.length === 0 ? (
                <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-full">Oops!! No Hotels Available.
                </p>
            ) : (
              <div>
                <ul className=' bg-white'>
                    {hotels.map((hotel, index) => (
                      <div className=''>
                        <Card key={index} className= " md:max-w-4xl mr-4 ml-12 mt-6 mb-6 "  imgSrc={hotel.imageurl} horizontal>
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{hotel.name}</h3>
                            <p className="font-semibold text-gray-700 dark:text-gray-400">{hotel.Location}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Visit site: <a href={hotel.url}>{hotel.url}</a></p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Price/room: {hotel.price}</p>
                            <Rating>
                              <Rating.Star />
                              <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">{hotel.rating}</p>
                            </Rating>
                            <div className=' flex flex-row'>
                            {
                              hotel.add? (<Button pill className=' w-16 m-2' color='purple' onClick={() => handleAdd(index,hotel)}  >
                                      <MdAdd className="h-6 w-6 " />
                                    </Button>
                            ):(
                              <Button disabled pill className=' w-16 m-2' color='purple' >
                                <MdAdd className="h-6 w-6 " />
                              </Button>
                            )
                            }
                            {
                              hotel.remove? (<Button outline pill className=' w-16 m-2' color='purple' onClick={() => handleRemove(index,hotel)}>
                                        <MdRemove className="h-6 w-6 " />
                                      </Button>
                            ):(
                              <Button disabled outline pill className=' w-16 m-2' color='purple' >
                                <MdRemove className="h-6 w-6 " />
                              </Button>
                            )
                            }
                            </div>
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
                <div className='flex justify-center mt-4'>
                  <Button className=' rounded-full' color='purple' onClick={handleSave} >Save</Button>
                </div>
                </div>
                )
              }
    </div>
  )
}
