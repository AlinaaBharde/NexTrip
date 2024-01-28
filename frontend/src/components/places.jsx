import React, { useState, useEffect } from 'react';
import { Button, Card, Rating } from 'flowbite-react';
import { MdAdd, MdRemove } from "react-icons/md";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { fetchPlacesData } from '../services/placeservices';

export default function Places({ locationName, index }) {
  const { id } = useParams();
  const planId = id ? id.toString() : '';
  const { user } = useAuthContext();
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await fetchPlacesData(locationName);
        const updatedPlaces = response.map((place) => ({
          ...place,
          description: place.description.slice(0, 100),
          add: true,
          remove: false
        }));
        setPlaces(updatedPlaces);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching places:', error);
        setLoading(false);
      }
    };

    if (index === 2 && loading) {
      fetchPlaces();
    }
  }, [locationName, index, loading]);

  function handleAdd(index, selectedPlace) {
    const updatedPlaces = [...places];
    const place = updatedPlaces[index];
    setSelectedPlaces((prevSelected) => [...prevSelected, selectedPlace]);
    updatedPlaces[index] = { ...place, add: !place.add, remove: !place.remove };
    setPlaces(updatedPlaces);
  }

  function handleRemove(index, selectedPlace) {
    const updatedPlaces = [...places];
    setSelectedPlaces((prevSelected) =>
      prevSelected.filter((place) => place._id !== selectedPlace._id)
    );
    const place = updatedPlaces[index];
    updatedPlaces[index] = { ...place, add: !place.add, remove: !place.remove };
    setPlaces(updatedPlaces);
  }

  function handleSave() {
    console.log("Selected Places:", selectedPlaces);
    axios.post(
      `http://localhost:4000/api/places/add/${planId}`,
      JSON.stringify(selectedPlaces),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      }
    )
      .then((response) => {
        console.log("Places saved successfully: ", response);
      })
      .catch((error) => {
        console.error('Error submitting filter:', error);
      });
  }

  return (
    <div>
      <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline text-purple-600">Places</h1>
      {loading ? (
        <p className="ml-10 mt-6 mb-12 text-2xl text-indigo-700">Loading...</p>
      ) : places.length === 0 ? (
        <p className="ml-10 mt-6 mb-12 text-2xl text-indigo-700">Oops! No Places Available.</p>
      ) : (
        <div>
          {places.map((place, index) => (
            <Card key={index} className="md:max-w-4xl ml-12 mt-6 mb-6" imgSrc={place.image} horizontal>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{place.name}</h3>
              <p className="font-semibold text-gray-700 dark:text-gray-400">{place.Location}</p>
              <p name='description' className="font-normal text-gray-700 dark:text-gray-400">Description: {place.description}</p>
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">{place.ranking}</p>
              </Rating>
              <div className=' flex flex-row'>
                <Button pill className='w-16 m-2' onClick={() => handleAdd(index, place)} color='purple' disabled={!place.add}>
                  <MdAdd className="h-6 w-6" />
                </Button>
                <Button outline pill className='w-16 m-2' onClick={() => handleRemove(index, place)} color='purple' disabled={!place.remove}>
                  <MdRemove className="h-6 w-6" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <div className='flex justify-center mt-4'>
        <Button className='rounded-full' color='purple' onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
