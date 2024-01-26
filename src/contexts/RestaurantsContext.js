//you import context from react
import { createContext, useReducer } from "react";

//this is how you create a context Provider
export const RestaurantsContext=createContext()

//createContext->Provider (providing context)
//useContext->Consumer  (consuming context)

export const restaurantsReducer=(state,action)=>{
    switch(action.type){
        case 'SET_RESTAURANTS':
            return{
                restaurants:action.payload
            }
        // case 'CREATE_WORKOUT':
        //     return{
        //         workouts:[action.payload,...state.workouts]
        //     }
        case 'DELETE_RESTAURANTS':

            return{
                restaurants:state.restaurants.filter((w)=>w._id!==action.payload._id)
               
            }
        default:
            return state
    }
}
//workoutReducer function ends

 export const RestaurantsContextProvider=({children})=>{
    const [state,dispatch]=useReducer(restaurantsReducer,{ //reducer function(workoutReducer)
        restaurants:null //initial value
    })
    return(
        <RestaurantsContext.Provider value={{...state,dispatch}}>
            {children}
        </RestaurantsContext.Provider>
    )
}
