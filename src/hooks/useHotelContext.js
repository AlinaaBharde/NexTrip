import { HotelContext } from "../contexts/HotelContext";
// to consume/use the context import useContext
import { useContext } from "react";

export const useHotelContext=()=>{
    const context=useContext(HotelContext) //line to use the context we created
    if(!context){
        throw Error('useHotelContext must be used inside an HotelContextProvider ')
        //hence we wrapped app with WorkoutContextProvider?
    }
    
   return {
        ...context,
        dispatch: context.dispatch,
       
}
}