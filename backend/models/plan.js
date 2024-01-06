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
      cityToVisit: {
        type: String,
        required: true,
      },
      // startDate: {
      //   type: Date,
      //   // required: true,
      // },
      // endDate: {
      //   type: Date,
      //   // required: true,
      // },
      budget: {
        type: Number,
        required: true,
      },
      // modeOfTransportation: {
      //   type: String,
      //   required: true,
      // }
    }
);

const Plan = mongoose.model('Plan', planSchema);

export {Plan};