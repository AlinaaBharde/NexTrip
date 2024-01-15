import React, { useState } from 'react';
import { Button, Label, Card,Rating, Checkbox,Pagination, ToggleSwitch } from 'flowbite-react';
import { FaFilter } from "react-icons/fa";
import hotelLogo from '../images/bg-form.jpg';
import { MdAdd,MdRemove } from "react-icons/md";
import axios from 'axios';

export default function Hotels({City, planid}){
  const [filter, setfilter] = useState(false);
  const planId = planid ? planid.toString() : '';
  const [restaurants, setrestaurants] = useState([]);
  const [selectedrestaurants, setSelectedrestaurants] = useState([]);
  const [sortby, setsortby] = useState({
    Price: false,
    Rating: false,
  })
  const [veg, setType] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  const restaurantsPerPage = 3;

  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);
  const startIdx = (currentPage - 1) * restaurantsPerPage;
  const endIdx = startIdx + restaurantsPerPage;


  React.useEffect(() => {
    // const restaurantList = [
    //   {
    //     id: 1,
    //     name: 'RESTAURANT NAME1',
    //     Location: 'Address1',
    //     city: 'Mumbai',
    //     price: 3000,
    //     url: '#',
    //     imageurl: '',
    //     rating: 4,
    //     add: true,
    //     remove: false,
    //   },
    //   {
    //     id: 2,
    //     name: 'RESTAURANT NAME2',
    //     Location: 'Address2',
    //     city: 'Jaipur',
    //     price: 2000,
    //     url: '#',
    //     imageurl: '',
    //     rating: 4.5,
    //     add: true,
    //     remove: false,
    //   },
    //   {
    //     id: 3,
    //     name: 'RESTAURANT NAME3',
    //     Location: 'Address3',
    //     city: 'Mumbai',
    //     price: 3500,
    //     url: '#',
    //     imageurl: '',
    //     rating: 5,
    //     add: true,
    //     remove: false,
    //   },
    //   {
    //     id: 4,
    //     name: 'RESTAURANT NAME3',
    //     Location: 'Address3',
    //     city: 'Mumbai',
    //     price: 3500,
    //     url: '#',
    //     imageurl: '',
    //     rating: 5,
    //     add: true,
    //     remove: false,
    //   },
    //   {
    //     id: 5,
    //     name: 'RESTAURANT NAME3',
    //     Location: 'Address3',
    //     city: 'Mumbai',
    //     price: 3500,
    //     url: '#',
    //     imageurl: '',
    //     rating: 5,
    //     add: true,
    //     remove: false,
    //   }
    // ];

    const FetchRestaurants = () => {
      try {
        axios.get(
          `http://localhost:8000/hotels`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setrestaurants(response.data);
        })
      } catch (error) {
        console.error('Error fetching travel plans:', error);
      }
    };


    
    FetchRestaurants();

  }, [planId]);

  function handleClick(){
    setfilter(!filter);
  }

  function renderFilter(){
    return(
      <div className=' mb-5 -mt-2'>
      <div className="ml-5 mr-5  inline-flex gap-2">
        <Checkbox id="sortPrice" onChange={() => handleChange('price')} color='purple'/>
        <Label htmlFor="sortPrice">Sort by Price</Label>
      </div>
      <div className="ml-5 m-2 inline-flex gap-2">
        <Checkbox id="sortRating" onChange={() => handleChange('rating')} color='purple'/>
        <Label htmlFor="sortRating">Sort by Rating </Label>
      </div>
      <ToggleSwitch checked={veg} label="Veg" onChange={setType} color='purple' className=' ml-5 mt-2 mb-2' />
      <Button pill className=' w-16 ml-36' color='purple' onClick={handleApply}  >
        Apply
      </Button>
    </div>
    )
  }

  function getRestaurantIndexOnPage(originalIndex) {
    return (currentPage - 1) * restaurantsPerPage + originalIndex;
  }

  function handleAdd(index,selectedrestaurant) {
    const restaurantIndex = getRestaurantIndexOnPage(index);

    setrestaurants((prevrestaurant) =>
      prevrestaurant.map((restaurant, i) => 
        i === restaurantIndex
          ? { ...restaurant, add: !restaurant.add, remove: !restaurant.remove }
          : restaurant
      )
    );
    setSelectedrestaurants(prevSelected => [...prevSelected, selectedrestaurant])

  }

  function handleRemove(index, selectedrestaurant) {
    const restaurantIndex = getRestaurantIndexOnPage(index);

    setrestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant, i) =>
        i === restaurantIndex
          ? { ...restaurant, add: !restaurant.add, remove: !restaurant.remove }
          : restaurant      
        )
    );
  
    
    setSelectedrestaurants((prevSelected) =>
      prevSelected.filter((restaurant) => restaurant.id !== selectedrestaurant.id)
    );
  }
  

  function handleSave() {
    console.log("Selected Restaurants:", selectedrestaurants);
    axios.post(
      `http://localhost:8000/plan/save/${planId}`,
      JSON.stringify(selectedrestaurants),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }

    )
    .then((response) => {
      console.log("Hotels saved successfully: ",  response);
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

  function handleChange(value){
    setsortby((prevValue) => {
      if (value === 'price') {
        return {
          ...prevValue,
          Price: !prevValue.Price,
        }
      } else if (value === 'rating') {
        return {
          ...prevValue,
          Rating: !prevValue.Rating,
        }
      }
    });
  }

  const handleApply=  (event) => {
    event.preventDefault();
    
    axios.post(
      `http://localhost:8000/plan/${planId}`,
      JSON.stringify(...sortby, veg),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      setrestaurants(response.data);
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

  return (
    <div className=''>
    <div className='w-full flex-col top-0 '>
      <Button className='ml-16 text-xl font-semibold mb-5 -mt-2 bg-transparent hover:shadow' style={{color: '#5F2EEA', backgroundColor: 'white'}} onClick={handleClick} ><FaFilter />Filter</Button>
      {
        filter? renderFilter() : null 
      } 
    </div>
    <h1 className="pl-12 top-0 font-bold text-7xl rounded-md underline" style={{ 'backgroundColor': 'white', 'width': 'cover' }}>Restaurants</h1>
            {restaurants.length === 0 ? (
                <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-full">Oops!! No Restaurants Available.
                </p>
            ) : (
              <div>
                <ul className=' bg-white'>
                    {restaurants.slice(startIdx,endIdx).map((restaurant, index) => (
                        <Card key={index} className=" md:max-w-4xl ml-12 mt-6 mb-6" imgSrc={hotelLogo}  horizontal >
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{restaurant.name}</h3>
                            <p className="font-semibold text-gray-700 dark:text-gray-400">{restaurant.Location}</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Visit site: <a href={restaurant.url}>{restaurant.url}</a></p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Price/room: {restaurant.price}</p>
                            <Rating>
                              <Rating.Star />
                              <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">{restaurant.rating}</p>
                            </Rating>
                            <div className=' flex flex-row'>
                            {
                              restaurant.add? (<Button pill className=' w-16 m-2' onClick={() => handleAdd(index,restaurant)} color='purple' >
                                      <MdAdd className="h-6 w-6 " />
                                    </Button>
                            ):(
                              <Button disabled pill className=' w-16 m-2' color='purple'>
                                <MdAdd className="h-6 w-6 " />
                              </Button>
                            )
                            }
                            {
                              restaurant.remove? (<Button outline pill className=' w-16 m-2' onClick={() => handleRemove(index,restaurant)} color='purple'>
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
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
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
