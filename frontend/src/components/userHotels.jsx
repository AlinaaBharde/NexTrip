import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

function UserHotels({ planid }) {
  const { user } = useAuthContext();
  const [hotels, setHotels] = useState([]);
  console.log(planid);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/hotels/display/' + planid);
        console.log(response.data);
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:4000/api/hotels/delete/${planid}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
        data: { hotelId },
      });
      setHotels(prevHotels => prevHotels.filter(hotel => hotel._id !== hotelId));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {hotels.map((hotel) => (
          <Card key={hotel._id} className="custom-max-width flex relative" imgSrc={hotel.imageurl} horizontal>
            <div>
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {hotel.name}
              </h5>
              <h6 className="font-normal text-gray-700 dark:text-gray-400">
                {hotel.location}
              </h6>
              <h5 className="text-2xl font-bold tracking-tight mt-2 text-gray-900 dark:text-white">
                Rs. {hotel.price}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Ratings : {hotel.rating} stars
              </p>
              <MdDelete onClick={() => handleDelete(hotel._id)} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
              <a href={hotel.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Book</a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserHotels;

