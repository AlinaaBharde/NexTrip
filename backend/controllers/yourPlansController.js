import { userPlans } from "../models/userPlan.js"; // Import your model (adjust the path as needed)

const yourPlansController = {
  getYourPlans: async (req, res) => {
    const {username} = req.params;
    try {
      const plans = await userPlans.find({username}); // Fetch all plans from the database
      res.json(plans);
    } catch (error) {
      console.error('Error fetching travel plans:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteYourPlan: async (req, res) => {
    const planId = req.params.id;

    try {
      // Delete the plan from the database based on the provided ID
      const deletedPlan = await userPlans.findByIdAndDelete(planId);

      if (!deletedPlan) {
        return res.status(404).json({ error: 'Plan not found' });
      }

      res.json(deletedPlan);
    } catch (error) {
      console.error('Error deleting travel plan:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default yourPlansController;
