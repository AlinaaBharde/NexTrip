import React, { useState, useEffect } from 'react';
import { Card, Tooltip, Button } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaMapLocation,  FaStar } from 'react-icons/fa6';

function UserPlaces({ planid }) {
  const { user } = useAuthContext();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/places/display/${planid}`);
        console.log(response.data);
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, [planid]);

  const handleDelete = async (placeId) => {
    try {
      await axios.delete(`http://localhost:4000/api/places/delete/${planid}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
        data: { placeId },
      });
      setPlaces(prevPlaces => prevPlaces.filter(place => place._id !== placeId));
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  const handleUpdate = () => {
    window.location.href = 'http://localhost:5173/plan/' + planid;
  };

  return (
  <div className="grid grid-cols-1  gap-2 mt-6 mb-12 ml-10 ">
  <Button className=" w-20 mx-auto mb-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow z-10" onClick={handleUpdate}>
        Update
      </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {places &&
            places.map((place, index) => (
              <Card
                key={index}
                className="mb-6 md:max-w-4xl mr-6 hover:shadow-md rounded-sm overflow-hidden"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-44 object-cover w-full mb-0 rounded-t-sm mt-0"
                />
                <div className="p-4">
                <div className="flex justify-between items-center mt-2 gap-1 border-b-2">
              <h2 className="text-xl font-serif font-bold mb-2 text-black">
                {place.name}
              </h2>
              <Tooltip content={place.active ? "Remove it" : "Save it"}  >
              <MdDelete onClick={() => handleDelete(place._id)} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
                </Tooltip>
              </div>
                  <p className="font-serif text-gray-700 dark:text-gray-400">
                  <strong>Description:</strong> {place.description.length > 250 ? place.description.slice(0,250) : place.description}...
                  </p>
                  <p className="font-serif flex gap-1 text-gray-700 dark:text-gray-400">
                  <FaMapLocation />{place.address}
                  </p>
                  <div className={`container flex flex-row items-center justify-center w-14 rounded-md text-center ${place.ranking < 15 ? ' bg-green-300 text-green-700' : ' bg-orange-300 text-orange-600'}`}>
                  <FaStar className='ml-1 mr-1'/>
                    {place.ranking}
                  </div>
                </div>
              </Card>
        ))}
      </div>
    </div>
  );
}

export default UserPlaces;

