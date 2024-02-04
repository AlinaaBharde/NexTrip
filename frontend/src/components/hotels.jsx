import React, { useState } from "react";
import {
  Button,
  Label,
  Card,
  Rating,
  Radio,
  Spinner,
  Tooltip,
} from "flowbite-react";
import { FaMapLocation, FaArrowRight,  FaStar } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { searchHotels } from "../services/hotelservices";
import Heart from "react-heart";

export default function Hotels({
  locationName,
  startDate,
  endDate,
  adults,
  index,
}) {
  const { id } = useParams();
  const planId = id ? id.toString() : "";
  const [hotels, sethotels] = useState([]);
  const [sortby, setsortby] = useState("PRICE");
  const { user } = useAuthContext();
  const [selectedDates, setSelectedDates] = useState({
    CheckIn: startDate,
    CheckOut: endDate,
  });
  const LocationName = locationName;
  const Adults = adults;
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);


  const onPageChange = (page) => {
    setPageNumber(page);
    FetchHotels();
  };

  console.log(startDate);

  const FetchHotels = async () => {
    try {
      setLoading(true);
      const response = await searchHotels(
        LocationName,
        selectedDates.CheckIn,
        selectedDates.CheckOut,
        Adults,
        pageNumber,
        sortby
      );
  
      let sortedHotels = response.map((hotel) => ({
        ...hotel,
        active: false,
      }));
  
      if (sortby === "PRICE") {
        sortedHotels = sortedHotels.sort((a, b) =>
          convertPriceToNumber(a.price) - convertPriceToNumber(b.price)
        );
      } else if (sortby === "RATING") {
        sortedHotels = sortedHotels.sort((a, b) => b.rating - a.rating);
      }
  
      sethotels(sortedHotels.slice(0, 30));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching travel plans:", error);
      setLoading(false);
    }
  };
  
  const convertPriceToNumber = (priceString) => {
    return Number(priceString.replace(/[₹,]/g, ''));
  };
  
  

  React.useEffect(() => {
    if (index === 0 && loading) {
      FetchHotels();
    }
  }, [
    LocationName,
    sortby,
    pageNumber,
    Adults,
    selectedDates.CheckIn,
    selectedDates.CheckOut,
    index,
    loading,
    hotels,
  ]);

  function RenderFilterCard() {
    return (
      <div className="relative flex items-center justify-center w-screen">
        <Card
          className="bg-cover bg-center h-64 relative rounded-lg w-full"
          style={{
            backgroundImage: `url(https://media.architecturaldigest.com/photos/57e42deafe422b3e29b7e790/master/pass/JW_LosCabos_2015_MainExterior.jpg)`,
          }}
        >
          <div className="bg-opacity-30 inset-0 bg-black rounded-xl">
          <div className="flex flex-col items-center justify-center relative z-10">
            <div className="text-white text-center font-mono text-7xl sm:text-17xl">Discover Your Dream Stay</div>
            <div className="flex items-center justify-center pb-4">
              {renderFilter()}
            </div>
          </div>
          </div>
        </Card>
      </div>
    );
  }
  

  function renderFilter() {
    return (
      <div className="mx-auto mt-4 flex flex-wrap justify-center items-center w-full rounded-sm backdrop-filter backdrop-blur-lg bg-opacity-10  bg-gray-200 dark:bg-gray-800 p-4">
        <div className="ml-5 mr-2 inline-flex gap-2 ">
          <Radio
            id="Price"
            name="Sort"
            onChange={() => setsortby("PRICE")}
            color="purple"
          />
          <Label htmlFor="sortPrice" className="text-white">
            Sort by Price
          </Label>
        </div>
        <div className="ml-5 mr-2 inline-flex gap-2">
          <Radio
            id="Rating"
            name="Sort"
            onChange={() => setsortby("RATING")}
            color="purple"
          />
          <Label htmlFor="sortRating" className="text-white">
            Sort by Rating
          </Label>
        </div>
        <div className="flex items-center sm:flex-row">
          <div className="ml-5 m-2">
            <Label
              htmlFor="checkIn"
              className="block text-sm font-medium text-white dark:text-white"
            >
              Check In
            </Label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              className="mt-1 p-2 border rounded-md w-full text-black"
              value={selectedDates?.CheckIn}
              min={startDate}
              max={endDate}
              onChange={(e) => handleDateChange("CheckIn", e.target.value)}
            />
          </div>
          <div className="ml-5 m-2">
            <Label
              htmlFor="checkOut"
              className="block text-sm font-medium text-white dark:text-white"
            >
              Check Out
            </Label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              className="mt-1 p-2 border rounded-md w-full text-black"
              value={selectedDates?.CheckOut}
              min={startDate}
              max={endDate}
              onChange={(e) => handleDateChange("CheckOut", e.target.value)}
            />
          </div>
        </div>
        <Button
          pill
          className="w-24 m-2 rounded-md"
          color="purple"
          gradientDuoTone="purpleToPink"
          onClick={handleApply}
        >
          Search <IoIosSearch className="ml-2" />
        </Button>
      </div>
    );
  }
  

  async function handleApply() {
    setLoading(true);
    if (index === 0 && loading) {
      await FetchHotels();
    }
  }

  async function handleAdd(index, hotel) {
    const updatedHotels = [...hotels];
    const addedHotel = {
      ...hotel,
      active: hotel?.active ? !hotel.active : true,
    };
    updatedHotels[index] = addedHotel;
    sethotels(updatedHotels);

    try {
      const response = await axios.post(
        `http://localhost:4000/api/hotels/add/${planId}`,
        JSON.stringify(addedHotel),
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        }
      );

      console.log("Hotel added successfully: ", response);
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  }

  async function handleRemove(index, hotel) {
    const updatedHotels = [...hotels];
    const removedHotel = { ...hotel, active: !hotel.active };
    updatedHotels[index] = removedHotel;
    sethotels(updatedHotels);
  
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/hotels/delete/${planId}`,
        {
          data: removedHotel, 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        }
      );
  
      console.log("Hotel removed successfully: ", response);
    } catch (error) {
      console.error("Error removing hotel:", error);
      if (error.response && error.response.status === 401) {
        console.log("User not logged in. Redirecting to login page...");
      } else {
        console.log("An error occurred during hotel removal:", error.message);
      }
    }
  }
  


  const handleDateChange = (name, value) => {
    setSelectedDates((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-gray-300 background-animate fixed top-0 left-0">
        <div className="flex items-center justify-center text-black">
          <Spinner
            aria-label="Default status example"
            size="xl"
            color="purple"
          />
          Loading
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex-col top-0 ">{RenderFilterCard()}</div>
      {hotels && hotels.length === 0 ? (
        <p className=" ml-10 container border rounded-md shadow bg-white p-6 pl-12  mt-6 mb-12 font-bold text-7xl w-2/3 bg-transparent text-indigo-700">
          Oops!! No Hotels Available.
        </p>
      ) : (
        <div className="grid grid-cols-1  gap-2 mt-6 mb-12 ml-10 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border-b-2">
          {hotels &&
            hotels.map((hotel, index) => (
              <Card
            key={index}
            className="mb-6 md:max-w-4xl mr-6 hover:shadow-md rounded-sm overflow-hidden"
          >
            <img
              src={hotel.imageUrl}
              alt={hotel.name}
              className="h-44 object-cover w-full mb-0 rounded-t-sm mt-0"
            />
            <div className="p-4">
            <div className="flex justify-between items-center mt-2 gap-1 border-b-2">
              <h2 className="text-xl font-serif font-bold mb-2 text-black">
                {hotel.name}
              </h2>
              <Tooltip content={hotel.active ? "Remove it": "Save it"} >
                <div style={{ width: "1rem", height: '1rem' }}>
                  <Heart
                    isActive={hotel.active}
                    onClick={() =>
                      hotel.active
                        ? handleRemove(index, hotel)
                        : handleAdd(index, hotel)
                    }
                    animationTrigger="both"
                    animationScale={1.25}
                    style={{ marginBottom: "1rem" }}
                  />
                </div>
                </Tooltip>
              </div>
              <p className="font-semibold text-gray-700 dark:text-gray-400">
                <FaMapLocation className="inline-block mr-2" />
                {hotel.location}
              </p>
              <Button
                color="purple"
                className="mb-2 w-28 rounded-sm h-8"
                gradientDuoTone="purpleToPink"
                onClick={() => window.open(hotel.url, "_blank")}
              >
                Book <FaArrowRight className="ml-1" />
              </Button>
              <p className="font-serif text-gray-700 dark:text-gray-400">
                Price/room: {hotel.price}
              </p>
              <div className={`container flex flex-row items-center justify-center w-14 rounded-md text-center ${hotel.rating > 3 ? ' bg-green-300 text-green-700' : ' bg-red-300 text-red-700'}`}>
                <FaStar className='ml-1 mr-1'/>
                {hotel.rating}
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
      )}
    </div>
  );
}
