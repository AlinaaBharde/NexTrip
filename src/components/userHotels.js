// UserHotels.js
import React from 'react';
import { Card } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';
import { useDataContext } from '../hooks/useDataContext';

function userHotels() {
  const { state, dispatch } = useDataContext();

  const handleDelete = async (hotel) => {
    try {
      await axios.delete(`http://localhost:3001/${hotel._id}`);
      dispatch({ type: 'DELETE_DATA', payload: hotel });
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {state.data.map((hotel) => (
          <Card className="custom-max-width flex relative" imgSrc="../images/travelLogo.jpg" horizontal>
                <div>
                    <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {hotel.name}
                    </h5>
                    <h6 className="font-normal text-gray-700 dark:text-gray-400">
                        {hotel.location}, {hotel.name}
                    </h6>
                    <h5 className="text-2xl font-bold tracking-tight mt-2 text-gray-900 dark:text-white">
                        Rs. {hotel.price}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Ratings {hotel.stars} stars and a number
                    </p>

                    <MdDelete onClick={handleDelete} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
}

export default userHotels;