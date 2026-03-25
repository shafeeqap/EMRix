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
    unique: true,
  },
},{ timestamps: true });

export const Patient = mongoose.model("Patient", patientSchema);
