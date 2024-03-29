const axios = require('axios');
const { getLocationId } = require('./getgeolocationid');
require('dotenv').config();

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
            'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
            'X-RapidAPI-Host': process.env.X_RapidAPI_Host
        }
    };

    try {
        const response = await axios.request(options);

        if (response.status >= 200 && response.status < 300) {
            const relevantHotelDetails = extractRelevantHotelDetails(response.data.data.data);
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
    return hotelData.map((hotel) => ({
        name: hotel.title,
        location: hotel.secondaryInfo,
        price: hotel.priceForDisplay,
        url: hotel.commerceInfo.externalUrl,
        imageUrl: hotel.cardPhotos[0].sizes.urlTemplate || null,
        rating: hotel.bubbleRating.rating
    }));
};

module.exports = { searchHotels };
