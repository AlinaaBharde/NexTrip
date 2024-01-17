const Userplan = require('../models/userplanModel.js');
const Hotels = require('../models/hotelModel.js');
const User = require('../models/userModel.js');
const { searchHotels } = require('../services/hotelservices.js');


const hotelController = {
    fetchHotel: async (req, res) => {
        try {
            const { locationName, checkin, checkout, adults, pageNumber, sortby } = req.body;
            const hotels = await searchHotels(locationName, checkin, checkout, adults, pageNumber, sortby);

            if (hotels === null) {
                return res.status(500).json({ error: "Error fetching hotels" });
            }
            res.status(200).json(hotels);
        } catch (err) {
            console.error("Fetching hotels error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    addHotel: async (req, res) => {
        try {
            const { planId } = req.params;
            const selectedHotel = req.body;

            const userId = req.user._id;
            const existingUser = await User.findById(userId)

            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }

            const existingPlan = await Userplan.findById(planId);

            if (!existingPlan) {
                return res.status(404).json({ error: "Plan not found" });
            }
            for (const hotel of selectedHotel) {
                const { name, location, price, url, imageurl, rating } = hotel;

                const newHotel = new Hotels({
                    name, location, price, url, imageurl, rating
                });

                await newHotel.save();

                existingPlan.hotels.push(newHotel._id);
            }

            const updatedPlan = await existingPlan.save();

            res.status(200).json(updatedPlan);
        } catch (err) {
            console.error("Adding hotel to plan error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    deleteHotel: async (req, res) => {
        try {
            const { planId } = req.params;
            const { HotelId } = req.body;

            const userId = req.user._id;
            const existingUser = await User.findById(userId)

            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }

            const existingPlan = await Userplan.findById(planId);

            if (!existingPlan) {
                return res.status(404).json({ error: "Plan not found" });
            }

            existingPlan.hotels.pull(HotelId);

            await Hotels.findByIdAndDelete(HotelId);

            const updatedPlan = await existingPlan.save();

            res.status(200).json(updatedPlan);
        } catch (err) {
            console.error("Deleting hotel from plan error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = {
    fetchHotel: hotelController.fetchHotel,
    addHotel: hotelController.addHotel,
    deleteHotel: hotelController.deleteHotel
}

