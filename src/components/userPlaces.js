// UserHotels.js
import React from 'react';
import { Card } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';
import { useDataContext } from '../hooks/useDataContext';

function userPlaces() {
  const { state, dispatch } = useDataContext();

  const handleDelete = async (place) => {
    try {
      await axios.delete(`http://localhost:3001/${place._id}`);
      dispatch({ type: 'DELETE_DATA', payload: place });
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {state.data.map((place) => (
            <Card className="custom-max-width flex relative" imgSrc="../images/travelLogo.jpg" horizontal>
                <div>
                    <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {place.name}
                    </h5>
                    <h6 className="font-normal text-gray-700 dark:text-gray-400">
                        {place.location}, {place.name}
                    </h6>
                    <h5 className="text-2xl font-bold tracking-tight mt-2 text-gray-900 dark:text-white">
                        Rs. {place.price}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Ratings {place.stars} stars and a number
                    </p>

                    <MdDelete onClick={handleDelete} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
}

export default userPlaces;