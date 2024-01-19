import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
    {tripName: {
        type: String,
        required: true,
      },
      numberOfPeople: {
        type: Number,
        required: true,
      },
      selectedCities:[ 
        {
        type: String,
        required: true,
        }
      ],
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      budget: {
        type: Number,
        required: true,
      },
      username: {
        type: String,
        required: true
      }
    }
);

const userPlans = mongoose.model('userPlans', planSchema);

export {userPlans};