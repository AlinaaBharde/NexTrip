import React, { useState } from 'react';
import { Button, Label, Card,Rating,Pagination, Radio } from 'flowbite-react';
import { FaFilter } from "react-icons/fa";
import { MdAdd,MdRemove } from "react-icons/md";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { searchRestaurants } from '../services/restaurantservices';

export default function Restaurants({locationName, index}){
  const [filter, setfilter] = useState(false);
  const {id} = useParams();
  const planId = id ? id.toString() : '';
  const { user } = useAuthContext();
  const LocationName = locationName;
  const [restaurants, setrestaurants] = useState([]);
  const [selectedrestaurants, setSelectedrestaurants] = useState([]);
  const [sortby, setsortby] = useState('');

  const [pageNumber, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);


  React.useEffect(() => {

    const FetchRestaurants = async () => {
      try {
        const response = await searchRestaurants(LocationName);
        setrestaurants(response);
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };

    if(index === 1){
      FetchRestaurants();
    }

  }, [LocationName, index]);

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
  
    updatedrestaurants[index] = { ...restaurant, add: true, remove: false };
    setrestaurants(updatedrestaurants);
  }
  
  function handleRemove(index, selectedrestaurant) {
   
    const updatedrestaurants = [...restaurants];
  
    setSelectedrestaurants((prevSelected) =>
      prevSelected.filter((restaurant) => restaurant._id !== selectedrestaurant._id)
    );
  
    const restaurant = updatedrestaurants[index];
    updatedrestaurants[index] = { ...restaurant, add: false, remove: true };
    setrestaurants(updatedrestaurants);
  }
  

  function handleSave() {
    console.log("Selected Restaurants:", selectedrestaurants);
    axios.post(
      `http://localhost:8000/api/restaurants/add/${planId}`,
      JSON.stringify(selectedrestaurants),
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


  const handleApply=  (event) => {
    event.preventDefault();
    
    const FetchRestaurants = async () => {
      try {
        const response = await searchRestaurants(LocationName);
        setrestaurants(response);
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };

    if(index === 1){
      FetchRestaurants();
    }

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
              <div>
                <ul className=' bg-white'>
                    {restaurants && restaurants.map((restaurant, index) => (
                        <Card key={index} className=" md:max-w-4xl ml-12 mt-6 mb-6" imgSrc={restaurant.image}  horizontal >
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{restaurant.name}</h3>
                            <p className="font-semibold text-gray-700 dark:text-gray-400">{restaurant.location}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Cuisine: {restaurant.cuisine.map((type) => ({type}))}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Price: {restaurant.pricetag}</p>
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
                <div className='flex justify-center mt-4'>
                  <Button className=' rounded-full' color='purple' onClick={handleSave} >Save</Button>
                </div>
                </div>
                )
              }
    </div>
  )
}


