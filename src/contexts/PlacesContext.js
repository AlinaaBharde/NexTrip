//you import context from react
import { createContext, useReducer } from "react";

//this is how you create a context Provider
export const PlacesContext=createContext()

//createContext->Provider (providing context)
//useContext->Consumer  (consuming context)

export const placesReducer=(state,action)=>{
    switch(action.type){
        case 'SET_PLACES':
            return{
                places:action.payload
            }
        // case 'CREATE_WORKOUT':
        //     return{
        //         workouts:[action.payload,...state.workouts]
        //     }
        case 'DELETE_PLACES':

            return{
                places:state.places.filter((w)=>w._id!==action.payload._id)
               
            }
        default:
            return state
    }
}
//workoutReducer function ends

 export const PlacesContextProvider=({children})=>{
    const [state,dispatch]=useReducer(placesReducer,{ //reducer function(workoutReducer)
        places:null //initial value
    })
    return(
        <PlacesContext.Provider value={{...state,dispatch}}>
            {children}
        </PlacesContext.Provider>
    )
}
