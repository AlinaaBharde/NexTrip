const axios = require('axios');
require('dotenv').config();

const fetchWeatherFromAPI = async (location) => {
    try {
        const locationResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`);
        const lat = locationResponse.data[0].lat;
        const lon = locationResponse.data[0].lon;
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
        const weather = {
            temperature: (weatherResponse.data.main.temp - 273.15).toFixed(2),
            main: weatherResponse.data.weather[0].main,
        }
        return weather;
    } catch (error) {
        console.error('Error fetching news:', error.message);
    }
}

module.exports = {
    fetchWeatherFromAPI
}