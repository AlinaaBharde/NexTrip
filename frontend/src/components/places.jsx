import React, { useState } from 'react';
import { Button, Card,  Spinner, Tooltip} from 'flowbite-react';
import { FaStar, FaMapLocation } from "react-icons/fa6";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { fetchPlacesData } from '../services/placeservices';
import Heart from 'react-heart';
import placeImg from '../images/places.jpg'; 

export default function Places({ locationName, index }) {
  const { id } = useParams();
  const planId = id ? id.toString() : '';
  const { user } = useAuthContext();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const response = await fetchPlacesData(locationName);
      const updatedPlaces = response.map((place) => ({
        ...place,
        active: false,
      }));
      setPlaces(updatedPlaces);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching places:', error);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (index === 2 && loading) {
      fetchPlaces();
    }
  }, [locationName, index, loading]);

  function RenderFilterCard() {
    return (
      <div className="relative flex items-center justify-center w-screen">
        <Card
          className="bg-cover bg-center h-60 relative rounded-sm w-full"
          style={{
            backgroundImage: `url(${placeImg})`,
          }}
        >
          <div className="bg-opacity-30 inset-0 bg-black rounded-xl">
          <div className="text-white mx-auto text-center font-mono text-7xl sm:text-17xl p-10">Explore Wonderfull Places in {locationName}</div>
          </div>
        </Card>
      </div>
    );
  }

  async function handleAdd(index, place) {
    const updatedPlaces = [...places];
    const addedplace = {
      ...place,
      active: place?.active ? !place.active : true,
    };
    updatedPlaces[index] = addedplace;
    setPlaces(updatedPlaces);

    try {
      const response = await axios.post(
        `http://localhost:4000/api/places/add/${planId}`,
        JSON.stringify(addedplace),
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        }
      );

      console.log("Place added successfully: ", response);
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  }

  async function handleRemove(index, place) {
    const updatedPlaces = [...places];
    const removedPlace = { ...place, active: !place.active };
    updatedPlaces[index] = removedPlace;
    setPlaces(updatedPlaces);

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/places/delete/${planId}`,
        {
          data: removedPlace,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        }
      );

      console.log("Place removed successfully: ", response);
    } catch (error) {
      console.error("Error removing Place:", error);
      if (error.response && error.response.status === 401) {
        console.log("User not logged in. Redirecting to login page...");
      } else {
        console.log("An error occurred during hotel removal:", error.message);
      }
    }
  }

  
  const onPageChange = (page) => {
    setPageNumber(page);
    fetchRestaurants();
  };
  

  if (loading) {
    return (
      <div className='h-screen w-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-gray-300 background-animate fixed top-0 left-0'>
        <div className="flex items-center justify-center gap-2 text-black">
          <Spinner aria-label="Default status example" size='xl' color='purple' />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div >
      <div className="w-full flex-col top-0 ">{RenderFilterCard()}</div>
      {places && places.length === 0 ? (
        <p className=" ml-10 container border rounded-md shadow bg-transparent p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-2/3 text-indigo-700">Oops!! No Places Available.
        </p>
      ) : (
        <div className="grid grid-cols-1  gap-2 mt-6 mb-12 ml-10 ">
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
                <div style={{ width: "1rem", height: '1rem' }}>
                  <Heart
                    isActive={place.active}
                    onClick={() =>
                      place.active
                        ? handleRemove(index, place)
                        : handleAdd(index, place)
                    }
                    animationTrigger="both"
                    animationScale={1.25}
                    style={{ marginBottom: "1rem" }}
                  />
                </div>
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

          <div className="flex overflow-x-auto ml-20 md:justify-center gap-2">
            <Button
              disabled={pageNumber === 1}
              onClick={() => onPageChange(pageNumber - 1)}
            >
              Previous
            </Button>
            <Button onClick={() => onPageChange(pageNumber + 1)}>Next</Button>
            {console.log("Page Number:", pageNumber)}
          </div>
        </div>
      )
      }
    </div>
  );
}
