import axios from 'axios';
import { getLocationId } from './getgeolocationid';

const fetchPlacesData = async (city) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('location_id', await getLocationId(city))
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'INR');
    encodedParams.set('offset', '0');

    const options = {
        method: 'POST',
        url: 'https://tourist-attraction.p.rapidapi.com/search',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'fdf27181b2msh518ba6f8db6838dp14cd4djsnbef46d023756',
            'X-RapidAPI-Host': 'tourist-attraction.p.rapidapi.com',
        },
        data: encodedParams,
    };
    try {
        const response = await axios.request(options);

        if (response.status >= 200 && response.status < 300) {
            const relevantPlaceDetails = extractRelevantPlaceDetails(response.data.results.data);
            console.log(relevantPlaceDetails);
            return relevantPlaceDetails;
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

const extractRelevantPlaceDetails = (placeData) => {
    return placeData.map((place) => ({
        name: place.name,
        image: place.photo && place.photo.images && place.photo.images.original ? place.photo.images.original.url : null,
        description: place.description,
        address: place.address,
        ranking: place.ranking_position
    }));
};

export { fetchPlacesData };
