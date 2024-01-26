//you import context from react
import { createContext, useReducer } from "react";

//this is how you create a context Provider
export const HotelContext=createContext()

//createContext->Provider (providing context)
//useContext->Consumer  (consuming context)

export const hotelReducer=(state,action)=>{
    switch(action.type){
        case 'SET_HOTEL':
            return{
                hotels:action.payload
            }
        // case 'CREATE_WORKOUT':
        //     return{
        //         workouts:[action.payload,...state.workouts]
        //     }
        case 'DELETE_HOTEL':

            return{
                hotels:state.hotles.filter((w)=>w._id!==action.payload._id)
               
            }
        default:
            return state
    }
}
//workoutReducer function ends

 export const HotelContextProvider=({children})=>{
    const [state,dispatch]=useReducer(hotelReducer,{ //reducer function(workoutReducer)
        hotels:null //initial value
    })
    return(
        <HotelContext.Provider value={{...state,dispatch}}>
            {children}
        </HotelContext.Provider>
    )
}


// UserHotels.js
import React from 'react';
import { Card } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';
import { useDataContext } from '../hooks/useDataContext';

function UserHotels() {
  const { state, dispatch } = useDataContext();

  const handleDelete = async (hotel) => {
    try {
      await axios.delete(`http://localhost:3001/${hotel._id}`);
      dispatch({ type: 'DELETE_DATA', payload: hotel });
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {state.data.map((hotel) => (
          <Card key={hotel._id} className="custom-max-width flex relative" imgSrc="../images/travelLogo.jpg" horizontal>
            {/* ... Hotel card content ... */}
            <MdDelete onClick={() => handleDelete(hotel)} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserHotels;
