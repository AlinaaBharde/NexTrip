import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

function UserRestaurants({ planid }) {
  const { user } = useAuthContext();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/restaurants/display/' + planid);
        console.log(response.data);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (restaurantId) => {
    try {
      await axios.delete(`http://localhost:4000/api/restaurants/delete/${planid}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
        data: { restaurantId },
      });
      console.log(user.token)
      setRestaurants(prevRestaurants => prevRestaurants.filter(restaurant => restaurant._id !== restaurantId));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {restaurants.map((restaurant) => (
          <Card key={restaurant._id} className="custom-max-width flex relative" imgSrc={restaurant.image} horizontal>
            <div>
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {restaurant.name}
              </h5>
              <h6 className="font-normal text-gray-700 dark:text-gray-400">
                {restaurant.location}
              </h6>
              <h5 className="text-2xl font-bold tracking-tight mt-2 text-gray-900 dark:text-white">
                {restaurant.pricetag}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Ratings : {restaurant.averagerating} stars
              </p>
              <MdDelete onClick={() => handleDelete(restaurant._id)} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserRestaurants;

