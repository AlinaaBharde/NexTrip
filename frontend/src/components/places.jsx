import React, { useState } from 'react';
import { Button, Card, Rating, Pagination } from 'flowbite-react';
import { MdAdd, MdRemove } from "react-icons/md";
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Places({ locationName, planid }) {
  const { user } = useAuthContext();
  const planId = planid ? planid.toString() : '';
  const [places, setplaces] = useState([]);
  const [selectedplaces, setSelectedplaces] = useState([]);
  const [pageNumber, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);


  React.useEffect(() => {

    const FetchPlaces = () => {
      try {
        axios.post(
          `http://localhost:4000/api/places/fetch`,
          JSON.stringify(locationName, pageNumber),
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`
            },
          }
        )
          .then((response) => {
            setplaces(response.data);
          })
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };



    FetchPlaces();

  }, [planId]);





  function handleAdd(index, selectedPlace) {

    const updatedPlaces = [...places];
    const place = updatedPlaces[index];

    setSelectedplaces((prevSelected) => [...prevSelected, selectedPlace]);

    updatedPlaces[index] = { ...place, add: true, remove: false };
    setplaces(updatedPlaces);
  }

  function handleRemove(index, selectedPlace) {

    const updatedPlaces = [...places];

    setSelectedplaces((prevSelected) =>
      prevSelected.filter((place) => place._id !== selectedPlace._id)
    );

    const place = updatedPlaces[index];
    updatedPlaces[index] = { ...place, add: false, remove: true };
    setplaces(updatedPlaces);
  }


  function handleSave() {
    console.log("Selected Restaurants:", selectedplaces);
    axios.post(
      `http://localhost:4000/api/places/add/${planId}`,
      JSON.stringify(selectedplaces),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      }

    )
      .then((response) => {
        console.log("Hotels saved successfully: ", response);
      })
      .catch((error) => {
        console.error('Error submitting filter:', error);
        if (error) {

          console.error('Server responded with:', error.data);
        } else if (error.request) {
          console.error('No response received');
        } else {
          console.error('Error setting up the request:', error.message);
        }
      })
  }


  const handleApply = (event) => {
    event.preventDefault();

    axios.post(
      `http://localhost:4000/api/places/fetch`,
      JSON.stringify(locationName, pageNumber),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      }
    )
      .then((response) => {
        setplaces(response.data);
      })
      .catch((error) => {
        console.error('Error submitting filter:', error);
        if (error) {

          console.error('Server responded with:', error.data);
        } else if (error.request) {
          console.error('No response received');
        } else {
          console.error('Error setting up the request:', error.message);
        }
      })
  }

  return (
    <div className=''>
      <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'white', 'width': 'cover' }}>Places</h1>
      {places.length === 0 ? (
        <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-full">Oops!! No Places Available.
        </p>
      ) : (
        <div>
          <ul className=' bg-white' >
            {places.map((place, index) => (
              <Card key={index} className=" md:max-w-4xl ml-12 mt-6 mb-6" imgSrc={place.url} horizontal >
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{place.name}</h3>
                <p className="font-semibold text-gray-700 dark:text-gray-400">{place.Location}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Description: {place.description}</p>

                <Rating>
                  <Rating.Star />
                  <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">{place.ranking}</p>
                </Rating>
                <div className=' flex flex-row'>
                  {
                    place.add ? (<Button pill className=' w-16 m-2' onClick={() => handleAdd(index, place)} color='purple' >
                      <MdAdd className="h-6 w-6 " />
                    </Button>
                    ) : (
                      <Button disabled pill className=' w-16 m-2' color='purple'>
                        <MdAdd className="h-6 w-6 " />
                      </Button>
                    )
                  }
                  {
                    place.remove ? (<Button outline pill className=' w-16 m-2' onClick={() => handleRemove(index, place)} color='purple'>
                      <MdRemove className="h-6 w-6 " />
                    </Button>
                    ) : (
                      <Button disabled outline pill className=' w-16 m-2' color='purple'>
                        <MdRemove className="h-6 w-6 " />
                      </Button>
                    )
                  }
                </div>
              </Card>
            ))}
          </ul>
          <div className="flex overflow-x-auto ml-20 md:justify-center">
            <Pagination
              layout="navigation"
              currentPage={pageNumber}
              onPageChange={onPageChange}
              onClick={handleApply}
              showIcons
            />
          </div>
          <div className='flex justify-center mt-4'>
            <Button className=' rounded-full' color='purple' onClick={handleSave} >Save</Button>
          </div>
        </div>
      )
      }
    </div>
  )
}
