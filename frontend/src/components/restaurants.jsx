import React, { useState } from 'react';
import { Button, Label, Card,Rating,Pagination, Radio, Spinner, Alert } from 'flowbite-react';
import { FaFilter } from "react-icons/fa";
import { MdAdd,MdRemove,MdClose } from "react-icons/md";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { searchRestaurants } from '../services/restaurantservices';
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function Restaurants({locationName, index}){
  const [filter, setfilter] = useState(false);
  const {id} = useParams();
  const planId = id ? id.toString() : '';
  const { user } = useAuthContext();
  const LocationName = locationName;
  const [restaurants, setrestaurants] = useState([]);
  const [selectedrestaurants, setSelectedrestaurants] = useState([]);
  const [sortby, setsortby] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });
  const [pageNumber, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);


  React.useEffect(() => {

    const FetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await searchRestaurants(LocationName);
        const updateRestaurants = response.map((restaurant) => ({
          ...restaurant,
          add: true,
          remove: false,
        }))
        setrestaurants(updateRestaurants);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };

    if(index === 1 && loading){
      FetchRestaurants();
    }

  }, [LocationName, index, loading]);

  function handleClick(){
    setfilter(!filter);
  }

  function renderFilter() {
    return (
      <div className='mx-auto flex flex-wrap items-center'>
        <div className="ml-5 m-2 inline-flex gap-2 mb-2">
          <Radio id="sortPrice" name='Sort' onChange={() => setsortby('price')} color='purple'/>
          <Label htmlFor="sortPrice">Sort by Price</Label>
        </div>
        <div className="ml-5 m-2 inline-flex gap-2">
          <Radio id="sortRating" name='Sort' onChange={() => setsortby('rating')} color='purple'/>
          <Label htmlFor="sortRating">Sort by Rating</Label>
        </div>
        <Button pill className='w-16 m-2' color='purple' onClick={handleApply}>
          Apply
        </Button>
      </div>
    );
  }
  

  

  function handleAdd(index, selectedrestaurant) {

    const updatedrestaurants = [...restaurants];
    const restaurant = updatedrestaurants[index];
  
    setSelectedrestaurants((prevSelected) => [...prevSelected, selectedrestaurant]);
  
    updatedrestaurants[index] = { ...restaurant, add: !restaurant.add, remove: !restaurant.remove };
    setrestaurants(updatedrestaurants);
  }
  
  function handleRemove(index, selectedrestaurant) {
   
    const updatedrestaurants = [...restaurants];
  
    setSelectedrestaurants((prevSelected) =>
      prevSelected.filter((restaurant) => restaurant._id !== selectedrestaurant._id)
    );
  
    const restaurant = updatedrestaurants[index];
    updatedrestaurants[index] = { ...restaurant, add: !restaurant.add, remove: !restaurant.remove };
    setrestaurants(updatedrestaurants);
  }
  

  function handleSave() {
    console.log("Selected Restaurants:", selectedrestaurants);
    axios.post(
      `http://localhost:4000/api/restaurants/add/${planId}`,
      JSON.stringify(selectedrestaurants),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      }

    )
    .then((response) => {
      console.log("Restaurants saved successfully: ", response);
      setAlert({ show: true, type: 'success', message: 'Restaurants saved successfully!' });
    })
    .catch((error) => {
      console.error('Error submitting filter:', error);
      if (error) {
        console.error('Server responded with:', error.data);
        setAlert({ show: true, type: 'error', message: `Error: ${error.data}` });
      } else if (error.request) {
        console.error('No response received');
        setAlert({ show: true, type: 'error', message: 'No response received from the server.' });
      } else {
        console.error('Error setting up the request:', error.message);
        setAlert({ show: true, type: 'error', message: `Error: ${error.message}` });
      }
    });
  }


  const handleApply=  (event) => {
    event.preventDefault();
    
    const FetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await searchRestaurants(LocationName);
        setrestaurants(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };

    if(index === 1 && loading){
      FetchRestaurants();
    }

  }

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
    <div className='w-full flex-col top-0 bg-transparent '>
      
      <Button className='ml-16 text-xl font-semibold mb-5 -mt-2 bg-transparent hover:bg-none' style={{color: '#5F2EEA', backgroundColor: 'transparent' }} onClick={handleClick} ><FaFilter />Filter</Button>
      {
        filter? renderFilter() : null 
      } 
    </div>
    <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'transparent', 'width': 'cover', 'color': '#5F2EEA'}}>Restaurants</h1>
            {restaurants && restaurants.length === 0 ? (
                <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-indigo-700 text-7xl w-2/3">Oops!! No Restaurants Available.
                </p>
            ) : (
              <div className="grid grid-cols-1  gap-2 mt-6 mb-12 ml-10 ">
              <div className='flex flex-col justify-center mx-auto mt-4'>
                  <Button className=' rounded-full mb-2 justify-center w-20' color='purple' onClick={handleSave} >Save</Button>
                  {alert.show && (
                    <Alert type={alert.type} icon={IoMdCheckmarkCircle}>
                      <div className="flex justify-between items-center max-w-2xl gap-10">
                        <span>{alert.message}</span>
                        <Button className="bg-transparent mr-4 right-0 rounded-full w-10 " color='transparent'  onClick={() => setAlert({ show: false, type: 'success', message: '' })}>
                          <MdClose />
                        </Button>
                      </div>
                    </Alert>
                  )}
              </div>
                <ul className=''>
                    {restaurants && restaurants.map((restaurant, index) => (
                        <Card key={index} className=" md:max-w-4xl mt-6 mb-6" imgSrc={restaurant.image}  horizontal >
                            <h3 className="text-5xl font-serif font-bold tracking-tight text-gray-900 dark:text-white p-0">{restaurant.name}</h3>
                            <p className=" font-serif text-gray-700 dark:text-gray-400">Cuisine: {restaurant.cuisine.join(', ')}</p>
                            <p className="font-serif text-gray-700 dark:text-gray-400">PriceTag: {restaurant.pricetag}</p>
                            <Rating>
                              <Rating.Star />
                              <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">{restaurant.averagerating}</p>
                            </Rating>
                            <div className=' flex flex-row'>
                            {
                              restaurant.add? (<Button pill className=' w-16 m-2' onClick={() => handleAdd(index,restaurant)} color='purple' >
                                      <MdAdd className="h-6 w-6 " />
                                    </Button>
                            ):(
                              <Button disabled pill className=' w-16 m-2' color='purple'>
                                <MdAdd className="h-6 w-6 " />
                              </Button>
                            )
                            }
                            {
                              restaurant.remove? (<Button outline pill className=' w-16 m-2' onClick={() => handleRemove(index,restaurant)} color='purple'>
                                        <MdRemove className="h-6 w-6 " />
                                      </Button>
                            ):(
                              <Button disabled outline pill className=' w-16 m-2' color='purple'>
                                <MdRemove className="h-6 w-6 " />
                              </Button>
                            )
                            }
                            </div>
                        </Card>
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
                <div className='flex flex-col justify-center mt-4'>
                  <Button className='rounded-full mb-2 justify-center items-center w-20' color='purple' onClick={handleSave} >Save</Button>
                  {alert.show && (
                    <Alert type={alert.type} icon={IoMdCheckmarkCircle}>
                      <div className="flex justify-between items-center max-w-2xl gap-10">
                        <span>{alert.message}</span>
                        <Button className="bg-transparent mr-4 right-0 rounded-full w-10 " color='transparent'  onClick={() => setAlert({ show: false, type: 'success', message: '' })}>
                          <MdClose />
                        </Button>
                      </div>
                    </Alert>
                  )}
                </div>
                </div>
                )
              }
    </div>
  )
}


