import React, { useEffect, useState } from "react";
import { Card } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useRestaurantContext } from "../hooks/useRestaurantContext";

function UserRestaurants() {
    const { dispatch } = useRestaurantContext();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:3001/');
                dispatch({ type: 'SET_RESTAURANTS', payload: response.data });
                setDetails(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, [dispatch]);

    function RestaurantCard({ restaurant }) {
        const { dispatch } = useRestaurantContext();

        const handleClick = async () => {
            try {
                await axios.delete(`http://localhost:3001/${restaurant._id}`);
                dispatch({ type: 'DELETE_RESTAURANTS', payload: restaurant });
            } catch (error) {
                console.error('Error deleting restaurants:', error);
            }
        };

        return (
            <Card className="custom-max-width flex relative" imgSrc="../images/travelLogo.jpg" horizontal>
                <div>
                    <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {restaurant.name}
                    </h5>
                    <h6 className="font-normal text-gray-700 dark:text-gray-400">
                        {restaurant.location}, {restaurant.name}
                    </h6>
                    <h5 className="text-2xl font-bold tracking-tight mt-2 text-gray-900 dark:text-white">
                        Rs. {restaurant.price}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Ratings {restaurant.stars} stars and a number
                    </p>

                    <MdDelete onClick={handleClick} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
                </div>
            </Card>
        );
    }

    return (
        <div className="home">
            <div className="workouts">
                {details && details.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
}

export default UserRestaurants;
