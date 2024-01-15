const userPlans = require('../models/userplanModel.js');
const User = require('../models/userModel.js');

const formController = {
    submitForm: async (req, res) => {
        try {
            const { tripName, numberOfPeople, cityToVisit } = req.body;

            const userId = req.user._id;
            const existingUser = await User.findById(userId)

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

            const newPlan = new userPlans({
                tripName,
                numberOfPeople,
                cityToVisit,
                startDate,
                endDate,
                userId
            });

            const savedPlan = await newPlan.save();
            console.log(savedPlan);
            res.status(201).json(savedPlan);

        } catch (err) {
            console.error("Submitting error: ", err);
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    }
};

module.exports = {
    submitForm: formController.submitForm
}