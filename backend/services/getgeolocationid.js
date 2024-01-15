const axios = require('axios');
require('dotenv').config();


async function getLocationId(locationQuery) {
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation',
        params: { query: locationQuery },
        headers: {
            'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
            'X-RapidAPI-Host': process.env.X_RapidAPI_Host
        },
    };

    try {
        const response = await axios.request(options);

        if (response.status >= 200 && response.status < 300) {
            console.log(response.data.data[0].locationId)
            return response.data.data[0].locationId;
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { getLocationId };