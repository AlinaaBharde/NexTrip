import axios from 'axios';

const fetchEventsFromAPI = async (city) => {
    const options = {
        method: 'GET',
        url: 'https://real-time-events-search.p.rapidapi.com/search-events',
        params: {
            query: city,
            start: '0'
        },
        headers: {
            'X-RapidAPI-Key': '48d971003dmsh0a9a5da4ce32eabp184f77jsn04c5607602eb',
            'X-RapidAPI-Host': 'real-time-events-search.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const relevantresponse = await extractRelevantDetails(response.data);
        console.log(relevantresponse);
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
        startdate: event.start_time,
        enddate: event.end_time
    }));
}

export { fetchEventsFromAPI };
