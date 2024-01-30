import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

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

  return (
    <div className="home">
      <div className="workouts">
        {places.map((place) => (
          <Card key={place._id} className="custom-max-width flex relative" imgSrc={place.image} horizontal>
            <div>
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {place.name}
              </h5>
              <h6 className="font-normal text-gray-700 dark:text-gray-400">
                {place.address}
              </h6>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Ranking :  {place.ranking}
              </p>
              <MdDelete onClick={() => handleDelete(place._id)} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserPlaces;

