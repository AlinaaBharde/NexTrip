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
                workouts:action.payload
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
