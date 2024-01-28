import React, { useState, useEffect } from 'react';
import { Button, Card, Rating } from 'flowbite-react';
import { MdAdd, MdRemove } from "react-icons/md";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { searchRestaurants } from '../services/restaurantservices';

export default function Restaurants({ locationName, index }) {
  const { id } = useParams();
  const planId = id ? id.toString() : '';
  const { user } = useAuthContext();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

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
      })
      .catch((error) => {
        console.error('Error submitting filter:', error);
      });
  }

  const onPageChange = (page) => {
    setPageNumber(page);
    fetchRestaurants();
  };

  return (
    <div>
      <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline text-purple-600">Restaurants</h1>
      {loading ? (
        <p className="ml-10 mt-6 mb-12 text-2xl text-indigo-700">Loading...</p>
      ) : restaurants.length === 0 ? (
        <p className="ml-10 mt-6 mb-12 text-2xl text-indigo-700">Oops! No Restaurants Available.</p>
      ) : (
        <div>
          {restaurants.map((restaurant, index) => (
            <Card key={index} className="md:max-w-4xl ml-12 mt-6 mb-6" imgSrc={restaurant.image} horizontal>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{restaurant.name}</h3>
              <p className="font-semibold text-gray-700 dark:text-gray-400">{restaurant.location}</p>
              <p className="font-normal text-gray-700 dark:text-gray-400">Cuisine: {restaurant.cuisine.join(', ')}</p>
              <p className="font-normal text-gray-700 dark:text-gray-400">Price: {restaurant.pricetag}</p>
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">{restaurant.averagerating}</p>
              </Rating>
              <div className=' flex flex-row'>
                <Button pill className='w-16 m-2' onClick={() => handleAdd(index, restaurant)} color='purple' disabled={!restaurant.add}>
                  <MdAdd className="h-6 w-6" />
                </Button>
                <Button outline pill className='w-16 m-2' onClick={() => handleRemove(index, restaurant)} color='purple' disabled={!restaurant.remove}>
                  <MdRemove className="h-6 w-6" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <div className="flex overflow-x-auto ml-20 md:justify-center">
        <Button disabled={pageNumber === 1} onClick={() => onPageChange(pageNumber - 1)}>Previous</Button>
        <Button onClick={() => onPageChange(pageNumber + 1)}>Next</Button>
        {console.log("Page Number:", pageNumber)}
      </div>
      <div className='flex justify-center mt-4'>
        <Button className='rounded-full' color='purple' onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}

