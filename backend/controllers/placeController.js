const { fetchData } = require('../services/placeservices');

const placeController = {
    fetchPlaces: async (req, res) => {
        try {
            const { locationName } = req.body;
            const places = await fetchData(locationName);

            if (places === null) {
                return res.status(500).json({ error: "Error fetching attractive places" });
            }
            res.status(200).json(places);
        } catch (err) {
            console.error("Fetching restaurants error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
}

module.exports = {
    fetchPlaces: placeController.fetchPlaces,
}