import React, { useEffect, useState } from "react";
import { Card } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useHotelContext } from "../hooks/useHotelContext";

function UserHotels() {
    const { dispatch } = useHotelContext(); //use general context? for all 3
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:3001/');
                dispatch({ type: 'SET_HOTELS', payload: response.data });
                setDetails(response.data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, [dispatch]);

    function HotelCard({ hotel }) {
        const { dispatch } = useHotelContext();

        const handleClick = async () => {
            try {
                await axios.delete(`http://localhost:3001/${hotel._id}`);
                dispatch({ type: 'DELETE_HOTEL', payload: hotel });
            } catch (error) {
                console.error('Error deleting hotel:', error);
            }
        };

        return (
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

                    <MdDelete onClick={handleClick} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
                </div>
            </Card>
        );
    }

    return (
        <div className="home">
            <div className="workouts">
                {details && details.map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                ))}
            </div>
        </div>
    );
}

export default UserHotels;
