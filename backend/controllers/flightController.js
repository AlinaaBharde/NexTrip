const { Userplan } = require('../models/userplanModel.js');
const { fetchFlightsFromAPI } = require('../services/flightservices.js');
require('dotenv').config();


const flightController = {
    fetchFlights: async (req, res) => {
        try {
            const { departureCity, arrivalCity, date, itineraryType, classOfService, adults, pageNumber } = req.body;
            const flightDetails = await fetchFlightsFromAPI(departureCity, arrivalCity, date, itineraryType, classOfService, adults, pageNumber);

            if (flightDetails === null) {
                return res.status(500).json({ error: "Error fetching flight details" });
            }

            res.status(200).json(flightDetails);
        } catch (err) {
            console.error("Fetching flights error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = {
    fetchFlights: flightController.fetchFlights,
}

