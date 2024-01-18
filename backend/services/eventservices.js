const axios = require('axios');

const fetchEventsFromAPI = async (city) => {
    const options = {
        method: 'GET',
        url: 'https://real-time-events-search.p.rapidapi.com/search-events',
        params: {
            query: 'Mumbai',
            start: '0'
        },
        headers: {
            'X-RapidAPI-Key': '89f8f412bamsh0574d8b8c64076ep10310fjsnbbdbc9f9826f',
            'X-RapidAPI-Host': 'real-time-events-search.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const relevantresponse = extractRelevantDetails(response.data);
        return relevantresponse;
    } catch (error) {
        console.error(error);
    }
}

const extractRelevantDetails = (eventData) => {
    return eventData.data.map((event) => ({
        name: event.name,
        location: event.fulladdress,
        description: event.description,
        image: event.thumbnail,
        startdate: event.start_time,
        enddate: event.end_time
    }));
}

module.exports = fetchEventsFromAPI;
