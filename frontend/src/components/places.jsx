import React, { useState } from 'react';
import { Button, Card,Rating,Pagination } from 'flowbite-react';
import { MdAdd,MdRemove } from "react-icons/md";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { fetchPlacesData } from '../services/placeservices';

export default function Places({locationName, index}){
  const {id} = useParams();
  const planId = id ? id.toString() : '';
  const { user } = useAuthContext();
  const LocationName = locationName;
  const [places, setplaces] = useState([]);
  const [selectedplaces, setSelectedplaces] = useState([]);
  const [pageNumber, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const onPageChange = (page) => setCurrentPage(page);

  


  React.useEffect(() => {

    const FetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await fetchPlacesData(LocationName);
        console.log(response);
        const updatedPlaces = response.map((place) => ({
          ...place,
          description: place.description.slice(0,100),
          add: true,
          remove: false
        }));
        setplaces(updatedPlaces);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };

    if(index === 2 && loading){
      FetchPlaces();
    }

  }, [LocationName, index, loading]);



  

function handleAdd(index, selectedPlace) {

  const updatedPlaces = [...places];
  const place = updatedPlaces[index];

  setSelectedplaces((prevSelected) => [...prevSelected, selectedPlace]);

  updatedPlaces[index] = { ...place, add: !place.add, remove: !place.remove };
  setplaces(updatedPlaces);
}

function handleRemove(index, selectedPlace) {
 
  const updatedPlaces = [...places];

  setSelectedplaces((prevSelected) =>
    prevSelected.filter((place) => place._id !== selectedPlace._id)
  );

  const place = updatedPlaces[index];
  updatedPlaces[index] = { ...place, add: !place.add, remove: !place.remove };
  setplaces(updatedPlaces);
}
  

  function handleSave() {
    console.log("Selected Places:", selectedplaces);
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
      console.log("Places saved successfully: ",  response);
    })
    .catch((error)=>{
      console.error('Error submitting filter:', error);
      if (error) {
        
        console.error('Server responded with:', error.data);
      } else if (error.request) {
        console.error('No response received');
      } else {
        console.error('Error setting up the request:', error.message);
      } 
    } )
  }


  const handleApply= async (event) => {
    event.preventDefault();
    
    try {
      setLoading(true);
      const response = await fetchPlacesData(LocationName);
      console.log(response);
      const updatedPlaces = response.map((place) => ({
        ...place,
        description: place.description.slice(0,100),
        add: true,
        remove: false
      }));
      setplaces(updatedPlaces);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching travel plans:', error);
    }
  }

  return (
    <div >
    <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'transparent', 'width': 'cover', 'color': '#5F2EEA' }}>Places</h1>
            {places && places.length === 0 ? (
                <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-2/3 text-indigo-700">Oops!! No Places Available.
                </p>
            ) : (
              <div>
                <ul className=' bg-transparent' >
                {places && places.map((place, index) => (
                        <Card key={index} className=" md:max-w-4xl ml-12 mt-6 mb-6" imgSrc={place.image}  horizontal >
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{place.name}</h3>
                            <p className="font-semibold text-gray-700 dark:text-gray-400">{place.Location}</p>
                            <p name='description' className="font-normal text-gray-700 dark:text-gray-400">Description: {place.description}</p>
                            
                            <Rating>
                              <Rating.Star />
                              <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">{place.ranking}</p>
                            </Rating>
                            <div className=' flex flex-row'>
                            {
                              place.add? (<Button pill className=' w-16 m-2' onClick={() => handleAdd(index,place)} color='purple' >
                                      <MdAdd className="h-6 w-6 " />
                                    </Button>
                            ):(
                              <Button disabled pill className=' w-16 m-2' color='purple'>
                                <MdAdd className="h-6 w-6 " />
                              </Button>
                            )
                            }
                            {
                              place.remove? (<Button outline pill className=' w-16 m-2' onClick={() => handleRemove(index,place)} color='purple'>
                                        <MdRemove className="h-6 w-6 " />
                                      </Button>
                            ):(
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
