import { PlacesContext } from "../contexts/PlacesContext";
// to consume/use the context import useContext
import { useContext } from "react";

export const usePlaceContext=()=>{
    const context=useContext(PlacesContext) //line to use the context we created
    if(!context){
        throw Error('usePlaceContext must be used inside an PlaceContextProvider ')
        //hence we wrapped app with WorkoutContextProvider?
    }
    
   return {
        ...context,
        dispatch: context.dispatch,
       
}
}