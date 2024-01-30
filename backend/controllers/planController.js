const userPlan = require("../models/userplanModel.js");
const user = require("../models/userModel.js");


const yourPlansController = {
    getYourPlans: async (req, res) => {
        const userId = req.user._id;
        try {
            const existinguser = await user.findById(userId);
            console.log(existinguser);
            const plans = await user.findById(userId);
            console.log("Plans : ", plans.plans)
            const plandetails = [];
            for (let i = 0; i < plans.plans.length; i++) {
                const plan = await userPlan.findById(plans.plans[i]);
                if (!plan) {
                    continue;
                }
                else {
                    plandetails.push(plan);
                }

            }
            console.log("plans : ", plandetails);
            res.json(plandetails);
        } catch (error) {
            console.error('Error fetching travel plans:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteYourPlan: async (req, res) => {
        const planId = req.params.id;

        try {
            const deletedPlan = await userPlan.findByIdAndDelete(planId);

            if (!deletedPlan) {
                return res.status(404).json({ error: 'Plan not found' });
            }
            const userId = req.user._id;
            const updatedUser = await user.findByIdAndUpdate(
                userId,
                { $pull: { plans: planId } },
                { new: true }
            );
            res.json(deletedPlan);
        } catch (error) {
            console.error('Error deleting travel plan:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = {
    getYourPlans: yourPlansController.getYourPlans,
    deleteYourPlan: yourPlansController.deleteYourPlan
};