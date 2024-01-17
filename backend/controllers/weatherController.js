const { fetchWeatherFromAPI } = require('../services/weatherservices.js');
require('dotenv').config();


const weatherController = {
    fetchWeather: async (req, res) => {
        try {
            const { CityToVisit } = req.body;
            const weather = await fetchWeatherFromAPI(CityToVisit);

            if (weather === null) {
                return res.status(500).json({ error: "Error fetching weather" });
            }
            res.status(200).json(weather);
        } catch (err) {
            console.error("Fetching weather error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = {
    fetchWeather: weatherController.fetchWeather,
}