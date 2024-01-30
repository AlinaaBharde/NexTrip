import axios from 'axios';



async function getLocationId(locationQuery) {
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation',
        params: { query: locationQuery },
        headers: {
            'X-RapidAPI-Key': 'fdebd55b92msh21517247185c7e1p13b3cejsn928ff4381e55',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        },
    };

    try {
        const response = await axios.request(options);
        console.log(response.data)

        if (response.status >= 200 && response.status < 300) {
            console.log(response.data.data[0].locationId)
            return response.data.data[0].locationId;
        } else {
            throw Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        throw Error(error.message);
    }
}

export { getLocationId };