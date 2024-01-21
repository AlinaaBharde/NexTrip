import { useHotelContext } from '../hooks/useHotelContext';
import { Card } from 'flowbite-react';
import { MdDelete } from "react-icons/md";

function HotelCard({hotel}) {

  const { dispatch } = useHotelContext();

  const handleClick=async ()=>{

        
///fetch request id
    const response=await fetch('http://localhost:3001/'+hotel._id,{
        method:'DELETE' // to send a delete request
    })
    

    //to trigger a re-render or updating the UI after delete has happened successfully
    //so we no longer see the deleted workout on our ui
    if(response.ok){
        const json=await response.json()
        dispatch({type:'DELETE_HOTEL',payload:json})  
        window.location.reload(false)
        
    }

}

  return (
    <Card className="custom-max-width flex relative" imgSrc="../images/travelLogo.jpg" horizontal>
      <div >
      <h5 className="text-3xl font-bold tracking-tight  text-gray-900 dark:text-white">
        Hotel Name
      </h5>
      <h6 className="font-normal  text-gray-700 dark:text-gray-400">
        Location,name
      </h6>
      <h5 className="text-2xl font-bold tracking-tight mt-2 text-gray-900 dark:text-white">
        Rs. Price
      </h5>
      <p className="font-normal  text-gray-700 dark:text-gray-400">
        Ratings  stars and a number
      </p>
      
      
      <MdDelete onClick={handleClick} className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
      </div>

      
    </Card>
  );
}

export default HotelCard



