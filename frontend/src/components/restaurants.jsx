import React, { useState } from 'react';
import { Button, Card, Rating, Pagination } from 'flowbite-react';
import { MdAdd, MdRemove } from "react-icons/md";
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Restaurants({ locationName, planid }) {
  const { user } = useAuthContext();
  console.log('Location Name:', locationName);
  console.log('Plan Id:', planid);
  const planId = planid ? planid.toString() : '';
  const [restaurants, setrestaurants] = useState([]);
  const [selectedrestaurants, setSelectedrestaurants] = useState([]);

  const [pageNumber, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  React.useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/restaurants/fetch`,
          JSON.stringify({
            locationName: locationName,
            page: pageNumber,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setrestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [locationName, pageNumber]);

  function handleAdd(index, selectedrestaurant) {

    const updatedrestaurants = [...restaurants];
    const restaurant = updatedrestaurants[index];

    setSelectedrestaurants((prevSelected) => [...prevSelected, selectedrestaurant]);

    updatedrestaurants[index] = { ...restaurant, add: true, remove: false };
    setrestaurants(updatedrestaurants);
  }

  function handleRemove(index, selectedrestaurant) {

    const updatedrestaurants = [...restaurants];

    setSelectedrestaurants((prevSelected) =>
      prevSelected.filter((restaurant) => restaurant._id !== selectedrestaurant._id)
    );

    const restaurant = updatedrestaurants[index];
    updatedrestaurants[index] = { ...restaurant, add: false, remove: true };
    setrestaurants(updatedrestaurants);
  }


  function handleSave() {
    console.log("Selected Restaurants:", selectedrestaurants);
    axios.post(
      `http://localhost:4000/api/restaurants/add/${planId}`,
      JSON.stringify(selectedrestaurants),
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

  return (
    <div className=''>
      <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'white', 'width': 'cover' }}>Restaurants</h1>
      {restaurants.length === 0 ? (
        <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-full">Oops!! No Restaurants Available.
        </p>
      ) : (
        <div>
          <ul className=' bg-white'>
            {restaurants.map((restaurant, index) => (
              <Card key={index} className=" md:max-w-4xl ml-12 mt-6 mb-6" imgSrc={restaurant.image} horizontal >
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{restaurant.name}</h3>
                <p className="font-semibold text-gray-700 dark:text-gray-400">{restaurant.location}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Cuisine: {restaurant.cuisine.map((type) => ({ type }))}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Price: {restaurant.pricetag}</p>
                <Rating>
                  <Rating.Star />
                  <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">{restaurant.averagerating}</p>
                </Rating>
                <div className=' flex flex-row'>
                  {
                    restaurant.add ? (<Button pill className=' w-16 m-2' onClick={() => handleAdd(index, restaurant)} color='purple' >
                      <MdAdd className="h-6 w-6 " />
                    </Button>
                    ) : (
                      <Button disabled pill className=' w-16 m-2' color='purple'>
                        <MdAdd className="h-6 w-6 " />
                      </Button>
                    )
                  }
                  {
                    restaurant.remove ? (<Button outline pill className=' w-16 m-2' onClick={() => handleRemove(index, restaurant)} color='purple'>
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
