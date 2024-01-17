const Userplan = require('../models/userplanModel.js');
const Restaurant = require('../models/restaurantModel.js');
const User = require('../models/userModel.js');
const { searchRestaurants } = require('../services/restaurantservices.js');

const restaurantController = {
    fetchRestaurants: async (req, res) => {
        try {
            const { locationName, page } = req.body;
            const restaurants = await searchRestaurants(locationName, page);

            if (restaurants === null) {
                return res.status(500).json({ error: "Error fetching restaurants" });
            }
            res.status(200).json(restaurants);
        } catch (err) {
            console.error("Fetching restaurants error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    addRestaurant: async (req, res) => {
        try {
            const { planId } = req.params;

            const selectedRestaurant = req.body;

            const userId = req.user._id;
            const existingUser = await User.findById(userId)

            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }

            const existingPlan = await Userplan.findById(planId)
            console.log(existingPlan)
            if (!existingPlan) {
                return res.status(404).json({ error: "Plan not found" });
            }

            for (const restaurant of selectedRestaurant) {
                const { name, location, cuisine, pricetag, averagerating, image } = restaurant;

                const newRestaurant = new Restaurant({
                    name: name,
                    location: location,
                    cuisine: cuisine,
                    pricetag: pricetag,
                    averagerating: averagerating,
                    image: image,
                });

                await newRestaurant.save();

                existingPlan.restaurants.push(newRestaurant._id);
            }
            const updatedPlan = await existingPlan.save();

            res.status(200).json(updatedPlan);
        } catch (err) {
            console.error("Adding restaurant to plan error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    deleteRestaurant: async (req, res) => {
        try {
            const { planId } = req.params;
            const { restaurantId } = req.body;
            const userId = req.user._id;
            const existingUser = await User.findById(userId)
            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }
            const existingPlan = await Userplan.findById(planId);
            console.log(existingPlan)

            if (!existingPlan) {
                return res.status(404).json({ error: "Plan not found" });
            }

            existingPlan.restaurants.pull(restaurantId);

            await Restaurant.findByIdAndDelete(restaurantId);

            const updatedPlan = await existingPlan.save();

            res.status(200).json(updatedPlan);
        } catch (err) {
            console.error("Deleting restaurant from plan error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = {
    fetchRestaurants: restaurantController.fetchRestaurants,
    addRestaurant: restaurantController.addRestaurant,
    deleteRestaurant: restaurantController.deleteRestaurant
};
