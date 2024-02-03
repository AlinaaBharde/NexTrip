import axios from 'axios';
import { getLocationId } from './getgeolocationid';


async function searchRestaurants(locationName, page) {
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants',
        params: {
            locationId: await getLocationId(locationName),
            page: page
        },
        headers: {
            'X-RapidAPI-Key': '08ac0065femshbf54bbe61e7d568p161f5ejsnf619e4cbf4bc',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        if (response.status >= 200 && response.status < 300) {
            const relevantDetails = extractRelevantDetails(response.data.data);
            console.log(relevantDetails);
            return relevantDetails;
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

function extractRelevantDetails(apiData) {
    if (!apiData || !apiData.data || !Array.isArray(apiData.data)) {
        return [];
    }

    return apiData.data.map(restaurant => ({
        name: restaurant.name,
        location: restaurant.location,
        cuisine: restaurant.establishmentTypeAndCuisineTags,
        pricetag: restaurant.priceTag,
        averagerating: restaurant.averageRating,
        image: restaurant.squareImgUrl,
    }));
}

export { searchRestaurants };
