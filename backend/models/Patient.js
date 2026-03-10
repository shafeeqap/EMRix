import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
},{ timestamps: true });

export default Patient = mongoose.model("Patient", patientSchema);
