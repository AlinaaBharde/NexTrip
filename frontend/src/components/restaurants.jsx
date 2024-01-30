import React, { useState, useEffect } from 'react';
import { Button, Card, Rating, Alert } from 'flowbite-react';
import { MdAdd, MdRemove, MdClose } from "react-icons/md";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { searchRestaurants } from '../services/restaurantservices';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Spinner } from 'flowbite-react';

export default function Restaurants({ locationName, index }) {
  const { id } = useParams();
  const planId = id ? id.toString() : '';
  const { user } = useAuthContext();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await searchRestaurants(locationName, pageNumber);
      const updatedRestaurants = response.map((restaurant) => ({
        ...restaurant,
        add: true,
        remove: false,
      }));
      setRestaurants(updatedRestaurants);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (index === 1 && loading) {
      fetchRestaurants();
    }
  }, [locationName, index, loading, pageNumber]);

  function handleAdd(index, selectedRestaurant) {
    const updatedRestaurants = [...restaurants];
    const restaurant = updatedRestaurants[index];
    setSelectedRestaurants((prevSelected) => [...prevSelected, selectedRestaurant]);
    updatedRestaurants[index] = { ...restaurant, add: !restaurant.add, remove: !restaurant.remove };
    setRestaurants(updatedRestaurants);
  }

  function handleRemove(index, selectedRestaurant) {
    const updatedRestaurants = [...restaurants];
    setSelectedRestaurants((prevSelected) =>
      prevSelected.filter((restaurant) => restaurant._id !== selectedRestaurant._id)
    );
    const restaurant = updatedRestaurants[index];
    updatedRestaurants[index] = { ...restaurant, add: !restaurant.add, remove: !restaurant.remove };
    setRestaurants(updatedRestaurants);
  }

  function handleSave() {
    console.log("Selected Restaurants:", selectedRestaurants);
    axios.post(
      `http://localhost:4000/api/restaurants/add/${planId}`,
      JSON.stringify(selectedRestaurants),
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

  const onPageChange = (page) => {
    setPageNumber(page);
    fetchRestaurants();
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
      <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'transparent', 'width': 'cover', 'color': '#5F2EEA' }}>Restaurants</h1>
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
                  <Button className="bg-transparent mr-4 right-0 rounded-full w-10 " color='transparent' onClick={() => setAlert({ show: false, type: 'success', message: '' })}>
                    <MdClose />
                  </Button>
                </div>
              </Alert>
            )}
          </div>
          <ul className=''>
            {restaurants && restaurants.map((restaurant, index) => (
              <Card key={index} className=" md:max-w-4xl mt-6 mb-6" imgSrc={restaurant.image} horizontal >
                <h3 className="text-5xl font-serif font-bold tracking-tight text-gray-900 dark:text-white p-0">{restaurant.name}</h3>
                <p className=" font-serif text-gray-700 dark:text-gray-400">Cuisine: {restaurant.cuisine.join(', ')}</p>
                <p className="font-serif text-gray-700 dark:text-gray-400">PriceTag: {restaurant.pricetag}</p>
                <Rating>
                  <Rating.Star />
                  <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">{restaurant.averagerating}</p>
                </Rating>
                <div className=' flex flex-row'>
                  {
                    restaurant.add ? (<Button pill className=' w-16 m-2' onClick={() => handleAdd(index, restaurant)} color='purple' >
                      <MdAdd className="h-6 w-6 " />
                    </Button>
                    ) : (
                      <Button disabled pill className=' w-16 m-2' color='purple'>
                        <MdAdd className="h-6 w-6 " />
                      </Button>
                    )
                  }
                  {
                    restaurant.remove ? (<Button outline pill className=' w-16 m-2' onClick={() => handleRemove(index, restaurant)} color='purple'>
                      <MdRemove className="h-6 w-6 " />
                    </Button>
                    ) : (
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
            <Button disabled={pageNumber === 1} onClick={() => onPageChange(pageNumber - 1)}>Previous</Button>
            <Button onClick={() => onPageChange(pageNumber + 1)}>Next</Button>
            {console.log("Page Number:", pageNumber)}
          </div>
          <div className='flex flex-col justify-center mt-4'>
            <Button className='rounded-full mb-2 justify-center items-center w-20' color='purple' onClick={handleSave} >Save</Button>
            {alert.show && (
              <Alert type={alert.type} icon={IoMdCheckmarkCircle}>
                <div className="flex justify-between items-center max-w-2xl gap-10">
                  <span>{alert.message}</span>
                  <Button className="bg-transparent mr-4 right-0 rounded-full w-10 " color='transparent' onClick={() => setAlert({ show: false, type: 'success', message: '' })}>
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

