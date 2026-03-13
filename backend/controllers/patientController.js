import { Patient } from "../models/Patient.js";

// Create patient
export const createPatient = async (req, res) => {
  try {
    const { name, mobile, patientId } = req.body;
    console.log(req.body, "req body");

    if (!name || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existPatient = await Patient.findOne({ mobile });
    // console.log(existPatient, 'Exist patient...');

    if (existPatient) {
      return res.status(409).json({ message: "Patient already exists" });
    }

    const patient = await Patient.create({ name, mobile, patientId });

    return res
      .status(201)
      .json({ message: "Patien created successfully", patient });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Search Patinet information by mobile
export const searchPatient = async (req, res) => {
  try {
    const { mobile } = req.query;
    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    const patient = await Patient.findOne({ mobile });
    if (!patient) {
      return res.status(404).json({ message: "Patien not found" });
    }

    res.status(200).json({ patient });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patien not found" });
    }

    res.status(200).json({ patient });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update patient
export const updatePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, mobile, patientId } = req.body;

    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { name, mobile, patientId },
      { new: true }
    );

    res.status(200).json({
      message: "Patient updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete patient
export const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await Patient.findByIdAndDelete(patientId);

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server Error", error: error.message });
  }
};
