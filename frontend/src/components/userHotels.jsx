import React, { useState, useEffect } from 'react';
import { Card, Tooltip, Button } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaMapLocation, FaStar, FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';


function UserHotels({ planid }) {
  const { user } = useAuthContext();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('https://nextrip-api.onrender.com/api/hotels/display/' + planid);
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
      await axios.delete(`https://nextrip-api.onrender.com/api/hotels/delete/${planid}`, {
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
    <div className='bg-[#f5f5f5]'>
      <div className="grid grid-cols-1  gap-2 mt-6 mb-10 ml-4 ">
        <Button className="w-20 mx-auto mb-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow z-10"><Link to={`https://neural-nexus-frontend.vercel.app/plan/${planid}`} className='font-bold text-white'>
          Update
        </Link></Button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hotels &&
            hotels.map((hotel, index) => (
              <Card
                key={index}
                className="mb-6 md:max-w-4xl mr-6 rounded-sm overflow-hidden"
              >
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="h-44 object-cover w-full mb-0 rounded-t-sm mt-0"
                />
                <div className="p-4">
                  <div className="flex justify-between items-center mt-2 gap-1 border-b-2">
                    <h2 className="text-xl font-serif font-bold mb-2 text-black">
                      {hotel.name}
                    </h2>
                    <Tooltip content="Remove It" >
                      <MdDelete onClick={() => handleDelete(hotel._id)} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
                    </Tooltip>
                  </div>
                  <p className="font-semibold mb-3 text-gray-700 dark:text-gray-400">
                    <FaMapLocation className="inline-block mr-2" />
                    {hotel.location ? hotel.location : "Address"}
                  </p>
                  <Button
                    color="purple"
                    className="mb-2 mx-auto rounded-sm h-8"
                    gradientDuoTone="purpleToPink"
                    onClick={() => window.open(hotel.url, "_blank")}
                  >
                    Book <FaArrowRight className="ml-1" />
                  </Button>
                  <p className="font-serif text-gray-700 dark:text-gray-400">
                    Price/room: {hotel.price}
                  </p>
                  <div className={`container flex flex-row items-center justify-center w-14 rounded-md text-center ${hotel.rating > 3 ? ' bg-green-300 text-green-700' : ' bg-red-300 text-red-700'}`}>
                    <FaStar className='ml-1 mr-1' />
                    {hotel.rating}
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserHotels;

