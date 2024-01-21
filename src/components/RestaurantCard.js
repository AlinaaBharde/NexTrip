import { Card } from 'flowbite-react';
import { MdDelete } from "react-icons/md";

function RestaurantCard() {
  return (
    <Card className="custom-max-width flex relative" imgSrc="../images/travelLogo.jpg" horizontal>
      <div >
      <h5 className="text-3xl font-bold tracking-tight  text-gray-900 dark:text-white">
        Restaurant Name
      </h5>
      <h6 className="font-normal  text-gray-700 dark:text-gray-400">
        Cuisisne
      </h6>
      <h6 className="font-normal  text-gray-700 dark:text-gray-400">
        Location,name
      </h6>
      <h5 className="text-2xl font-bold tracking-tight mt-2 text-gray-900 dark:text-white">
        Rs. Price
      </h5>
      <p className="font-normal  text-gray-700 dark:text-gray-400">
        Ratings  stars and a number
      </p>
      
      
      <MdDelete className="mt-2" style={{ color: 'red', fontSize: '24px' }} />
      </div>

      
    </Card>
  );
}

export default RestaurantCard