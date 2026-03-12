import { Doctor } from "../models/Doctor.js";

// Create a new doctor
export const createDoctor = async (req, res) => {
  try {
    console.log(req.body, "create doctor body");
    console.log(req.user.id);
    

    const doctor = await Doctor.create({ ...req.body, createdBy: req.user.id });

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

// Get doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId).populate("userId", "name");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update doctor details
export const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { name, department, workingHours, slotDuration, breakTime } =
      req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const updatedData = await Doctor.findByIdAndUpdate(
      doctorId,
      { name, department, workingHours, slotDuration, breakTime },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Doctor updated successfully", doctor: updatedData });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await Doctor.findByIdAndDelete(doctorId);

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
