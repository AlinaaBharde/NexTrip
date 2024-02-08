import React, { useState, useEffect } from 'react';
import { Card,Tooltip, Button } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { FaStar } from 'react-icons/fa6';

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
      await axios.delete(`https://neural-nexus-api.vercel.app/api/restaurants/delete/${planid}`, {
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

  const handleUpdate = () => {
    window.location.href = 'https://neural-nexus-frontend.vercel.app/plan/' + planid;
  };

  return (
    <div className="grid grid-cols-1  gap-2 mt-6 mb-12 ml-10 ">
      <Button className=" w-20 mx-auto mb-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow z-10" onClick={handleUpdate}>
        Update
      </Button>    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border-b-2">
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
              <MdDelete onClick={() => handleDelete(restaurant._id)} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
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
    </div>
  );
}

export default UserRestaurants;

