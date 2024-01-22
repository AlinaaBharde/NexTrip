import React, { useEffect, useState } from "react";
import { Card } from 'flowbite-react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { usePlaceContext } from "../hooks/usePlaceContext";

function UserPlaces() {
    const {  dispatch } = usePlaceContext();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('http://localhost:3001/');
                dispatch({ type: 'SET_PLACES', payload: response.data });
                setDetails(response.data);
            } catch (error) {
                console.error('Error fetching  places :', error);
            }
        };

        fetchPlaces();
    }, [dispatch]);

    function PlacesCard({ place }) {
        const { dispatch } = usePlacesContext();

        const handleClick = async () => {
            try {
                await axios.delete(`http://localhost:3001/${place._id}`);
                dispatch({ type: 'DELETE_PLACES', payload: place });
            } catch (error) {
                console.error('Error deleting places :', error);
            }
        };

        return (
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

                    <MdDelete onClick={handleClick} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
                </div>
            </Card>
        );
    }

    return (
        <div className="home">
            <div className="workouts">
                {details && details.map((place) => (
                    <PlacesCard key={place._id} place={place} />
                ))}
            </div>
           
        </div>
    );
}

export default UserPlaces;
