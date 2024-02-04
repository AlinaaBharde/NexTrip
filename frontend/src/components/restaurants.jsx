import React, { useState, useEffect } from 'react';
import { Button, Card, Tooltip} from 'flowbite-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { searchRestaurants } from '../services/restaurantservices';
import { Spinner } from 'flowbite-react';
import Heart from 'react-heart';
import { FaStar } from "react-icons/fa6";
import restbg from '../images/restaurantbg.jpg';

export default function Restaurants({ locationName, index }) {
  const { id } = useParams();
  const planId = id ? id.toString() : '';
  const { user } = useAuthContext();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await searchRestaurants(locationName, pageNumber);
      const updatedRestaurants = response.map((restaurant) => ({
        ...restaurant,
        active: false,
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

  function RenderFilterCard() {
    return (
      <div className="relative flex items-center justify-center w-screen">
        <Card
          className="bg-cover bg-center h-60 relative rounded-sm w-full"
          style={{
            backgroundImage: `url(${restbg})`,
          }}
        >
          <div className="bg-opacity-30 inset-0 bg-black rounded-xl">
          <div className="text-white mx-auto text-center font-mono text-7xl sm:text-17xl p-10">Find Best Restaurants in {locationName}</div>
          </div>
        </Card>
      </div>
    );
  }

  async function handleAdd(index, restaurant) {
    const updatedRestaurants = [...restaurants];
    const addedrestaurant = {
      ...restaurant,
      active: restaurant?.active ? !restaurant.active : true,
    };
    updatedRestaurants[index] = addedrestaurant;
    setRestaurants(updatedRestaurants);

    try {
      const response = await axios.post(
        `http://localhost:4000/api/restaurants/add/${planId}`,
        JSON.stringify(addedrestaurant),
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        }
      );

      console.log("Restaurant added successfully: ", response);
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  }

  async function handleRemove(index, restaurant) {
    const updatedRestaurants = [...restaurants];
    const removedRestaurant = { ...restaurant, active: !restaurant.active };
    updatedRestaurants[index] = removedRestaurant;
    setRestaurants(updatedRestaurants);

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/restaurants/delete/${planId}`,
        {
          data: removedRestaurant,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        }
      );

      console.log("Restaurant removed successfully: ", response);
    } catch (error) {
      console.error("Error removing resetaurant:", error);
      if (error.response && error.response.status === 401) {
        console.log("User not logged in. Redirecting to login page...");
      } else {
        console.log("An error occurred during hotel removal:", error.message);
      }
    }
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
    <div className="w-full flex-col top-0 ">{RenderFilterCard()}</div>
      {restaurants && restaurants.length === 0 ? (
        <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-indigo-700 text-7xl w-2/3">Oops!! No Restaurants Available.
        </p>
      ) : (
        <div className="grid grid-cols-1  gap-2 mt-6 mb-12 ml-10 ">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {restaurants &&
            restaurants.map((restaurant, index) => (
              <Card
                key={index}
                className="mb-6 md:max-w-4xl mr-6 hover:shadow-md rounded-sm overflow-hidden"
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-44 object-cover w-full mb-0 rounded-t-sm mt-0"
                />
                <div className="p-4">
                <div className="flex justify-between items-center mt-2 gap-1 border-b-2">
              <h2 className="text-xl font-serif font-bold mb-2 text-black">
                {restaurant.name}
              </h2>
              <Tooltip content={restaurant.active ? "Remove it" : "Save it"}  >
                <div style={{ width: "1rem", height: '1rem' }}>
                  <Heart
                    isActive={restaurant.active}
                    onClick={() =>
                      restaurant.active
                        ? handleRemove(index, restaurant)
                        : handleAdd(index, restaurant)
                    }
                    animationTrigger="both"
                    animationScale={1.25}
                    style={{ marginBottom: "1rem" }}
                  />
                </div>
                </Tooltip>
              </div>
                  <p className="font-serif text-gray-700 dark:text-gray-400">
                    Cuisine: {restaurant.cuisine.join(', ')}
                  </p>
                  <p className="font-serif text-gray-700 dark:text-gray-400">
                    PriceTag: {restaurant.pricetag}
                  </p>
                  <div className={`container flex flex-row items-center justify-center w-14 rounded-md text-center ${restaurant.averagerating > 3 ? ' bg-green-300 text-green-700' : ' bg-red-300 text-red-700'}`}>
                  <FaStar className='ml-1 mr-1'/>
                    {restaurant.averagerating}
                  </div>
                </div>
              </Card>
            ))}
        </div>

          <div className="flex overflow-x-auto ml-20 md:justify-center gap-2">
            <Button
              disabled={pageNumber === 1}
              onClick={() => onPageChange(pageNumber - 1)}
            >
              Previous
            </Button>
            <Button onClick={() => onPageChange(pageNumber + 1)}>Next</Button>
            {console.log("Page Number:", pageNumber)}
          </div>

        </div>
      )
      }
    </div>
  )
}

