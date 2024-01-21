// import React from "react";
// import HotelCard from "./HotelCard";
// import RestaurantCard from "./RestaurantCard";

// function List(){

//     return(
//         <div className="ml-16 mt-4">
//             <HotelCard />
//             <RestaurantCard />
//         </div>
//     )
// }

// export default List

import { useEffect, useState } from "react"
//components

import HotelCard from "./HotelCard"
// import WorkForm from "../components/WorkForm"

import { useHotelContext } from "../hooks/useHotelContext"


const List=()=>{

    const {hotels,dispatch}=useHotelContext()
    const [details,setDetails]=useState([])
    useEffect(()=>{
        const fetchHotels = async () => {
            try {
                const response = await fetch('http://localhost:3001/');//yeh dekho zara

                if (!response.ok) {
                    throw new Error(`Failed to fetch workouts. Status: ${response.status}`);
                }

                const json = await response.json();
                dispatch({ type: 'SET_WORKOUTS', payload: json });
                setDetails(json)
            } catch (error) {
                console.error('Error fetching workouts:', error);
                
            }
        };

        fetchHotels();
    },[dispatch])


    return(
        <div className="home">
          <div className="workouts">
          {details && details.map((hotel)=>(
            <HotelCard key={hotel._id} hotel={hotel}  />
          ))}

          </div>
          <HotelCard />
        </div>
    )
}

export default List