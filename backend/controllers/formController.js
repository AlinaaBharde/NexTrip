import { userPlans } from '../models/userPlan.js';



const formController = {
  submitForm: async (req, res) => {
    try {
        const { tripName, numberOfPeople, cityToVisit, budget, username} = req.body;
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        

        const newPlan = new userPlans({
          tripName,
          numberOfPeople,
          cityToVisit,
          budget,
          startDate,
          endDate,
          username
        });

        const savedPlan = await newPlan.save();

        res.status(201).json(savedPlan);
        console.log(savedPlan);
    } catch (err) {
        console.error("Submitting error: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default formController;


