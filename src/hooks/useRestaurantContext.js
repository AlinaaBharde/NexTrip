import { RestaurantsContext } from "../contexts/RestaurantsContext";
// to consume/use the context import useContext
import { useContext } from "react";

export const useRestaurantContext=()=>{
    const context=useContext(RestaurantsContext) //line to use the context we created
    if(!context){
        throw Error('useRestaurantsContext must be used inside an RestaurantsContextProvider ')
        //hence we wrapped app with WorkoutContextProvider?
    }
    
   return {
        ...context,
        dispatch: context.dispatch,
       
}
}