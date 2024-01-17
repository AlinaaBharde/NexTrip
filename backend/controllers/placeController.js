const { fetchData } = require('../services/placeservices');
const Userplan = require('../models/userplanModel.js')
const Place = require('../models/placeModel.js')
const User = require('../models/userModel.js');

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
            console.error("Fetching places error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    addPlaces: async (req, res) => {
        try {
            const { planId } = req.params;
            const selectedPlace = req.body;

            const userId = req.user._id;
            const existingUser = await User.findById(userId)

            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }

            const existingPlan = await Userplan.findById(planId);

            if (!existingPlan) {
                return res.status(404).json({ error: "Plan not found" });
            }

            for (const place of selectedPlace) {
                const { name, image, description, address, ranking } = place;
                const newPlace = new Place({
                    name, image, description, address, ranking
                });
                await newPlace.save();
                existingPlan.places.push(newPlace._id);
            }
            const updatedPlan = await existingPlan.save();

            res.status(200).json(updatedPlan);
        } catch (err) {
            console.error("Adding place to plan error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    deletePlaces: async (req, res) => {
        try {
            const { planId } = req.params;
            const { placeId } = req.body;

            const userId = req.user._id;
            const existingUser = await User.findById(userId)

            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }

            const existingPlan = await Userplan.findById(planId);

            if (!existingPlan) {
                return res.status(404).json({ error: "Plan not found" });
            }

            existingPlan.places.pull(placeId);

            await Place.findByIdAndDelete(placeId);

            const updatedPlan = await existingPlan.save();

            res.status(200).json(updatedPlan);
        } catch (err) {
            console.error("Deleting place from plan error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
}

module.exports = {
    fetchPlaces: placeController.fetchPlaces,
    addPlaces: placeController.addPlaces,
    deletePlaces: placeController.deletePlaces
}