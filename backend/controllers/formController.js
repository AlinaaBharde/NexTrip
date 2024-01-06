import { Plan } from '../models/plan.js';



const formController = {
  submitForm: async (req, res) => {
    try {
        // const startDate = new Date(req.body.startDate);
        // const endDate = new Date(req.body.endDate);
        const { tripName, numberOfPeople, cityToVisit, budget } = req.body;

        const newPlan = new Plan({
          tripName,
          numberOfPeople,
          cityToVisit,
          budget,
          // modeOfTransportation,
          // startDate,
          // endDate
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


