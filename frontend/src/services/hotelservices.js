import axios from 'axios';
import { getLocationId } from './getgeolocationid';


const searchHotels = async (locationName, checkin, checkout, adults, pageNumber = 1, sortby = "PRICE") => {
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels',
        params: {
            geoId: await getLocationId(locationName),
            checkIn: checkin,
            checkOut: checkout,
            pageNumber: pageNumber.toString(),
            currencyCode: 'INR',
            adults: adults,
            sort: sortby
        },
        headers: {
            'X-RapidAPI-Key': 'f672727da4msh1f681b18c06c6e3p1cca4ajsn1a3766c48e8e', 
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',  
        }
    };

    try {
        const response = await axios.request(options);

        if (response.status >= 200 && response.status < 300) {
            const relevantHotelDetails = Array.isArray(response.data.data) 
            ? extractRelevantHotelDetails(response.data.data)
            : [];
            return relevantHotelDetails;
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
};


const extractRelevantHotelDetails = (hotelData) => {
    if (!Array.isArray(hotelData)) {
        return [];
    }
    return hotelData.map((hotel) => ({
        name: hotel.title,
        location: hotel.secondaryInfo,
        price: hotel.priceForDisplay,
        url: hotel.commerceInfo.externalUrl,
        imageUrl: hotel.cardPhotos[0].sizes.urlTemplate || null,
        rating: hotel.bubbleRating.rating
    }));
};

export { searchHotels };
