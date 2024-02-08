const fetchEventsFromAPI = require('../services/eventservices');
require('dotenv').config();


const eventController = {
    fetchEvents: async (req, res) => {
        try {
            const { CityToVisit } = req.body;
            console.log('CityToVisit:', CityToVisit);
            const events = await fetchEventsFromAPI(CityToVisit);

            if (events === null) {
                return res.status(500).json({ error: "Error fetching news" });
            }
            console.log('Events data:', events);
            res.status(200).json(events);
        } catch (err) {
            console.error("Fetching news error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = {
    fetchEvents: eventController.fetchEvents,
}