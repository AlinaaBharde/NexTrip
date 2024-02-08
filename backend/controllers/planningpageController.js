const Userplan = require('../models/userplanModel.js')
const User = require('../models/userModel.js');

const planningpageController = {
    fetchData: async (req, res) => {
        try {
            const { planId } = req.params;
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

            const relevantinfo = {
                planName: existingPlan.tripName,
                startDate: existingPlan.startDate,
                endDate: existingPlan.endDate,
                City: existingPlan.cityToVisit,
                adults: existingPlan.numberOfPeople,
            }
            console.log(relevantinfo)
            res.status(200).json(relevantinfo);

        } catch (err) {
            console.error("Fetching planId error: ", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = { fetchData: planningpageController.fetchData }