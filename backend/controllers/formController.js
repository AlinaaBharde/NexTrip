const userPlans = require('../models/userplanModel.js');
const User = require('../models/userModel.js');
const { getJson } = require("serpapi");

const formController = {
    submitForm: async (req, res) => {
        try {
            const { tripName, numberOfPeople, cityToVisit } = req.body;

            const userId = req.user._id;
            const existingUser = await User.findById(userId);
            console.log(existingUser);

            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }

            const startDate = new Date(req.body.startDate);
            const endDate = new Date(req.body.endDate);

            if (!tripName || !startDate || !endDate) {
                return res.status(400).json({ success: false, error: 'Invalid input data' });
            }

            if (startDate >= endDate) {
                return res.status(400).json({ success: false, error: 'Start date must be before end date' });
            }

            getJson({
                q: cityToVisit,
                engine: "google_images",
                api_key: "c47c346d24c7c48f44d4dd43020717f47637040c4049e9d1b30299b1b24f312a"
            }, async (json) => {
                const image = json["images_results"][0].original;

                const newPlan = new userPlans({
                    tripName,
                    numberOfPeople,
                    cityToVisit,
                    startDate,
                    endDate,
                    userId,
                    image
                });

                try {
                    const savedPlan = await newPlan.save();
                    console.log(savedPlan);
                    const planId = savedPlan._id;
                    existingUser.plans.push(planId);
                    await existingUser.save();
                    console.log(existingUser.plans);
                    res.status(201).json(planId);
                } catch (error) {
                    console.error("Error saving user plan:", error);
                    res.status(500).json({ success: false, error: "Error saving user plan" });
                }
            });

        } catch (err) {
            console.error("Submitting error: ", err);
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    }
};

module.exports = {
    submitForm: formController.submitForm
};
