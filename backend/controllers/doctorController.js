import { Doctor } from "../models/Doctor.js";

// Create a new doctor
export const createDoctor = async (req, res) => {
  try {
    console.log(req.body, 'create doctor body');
    
    const doctor = await Doctor.create(req.body);

    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name");
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
