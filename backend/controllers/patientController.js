import { Patient } from "../models/Patient.js";
import {
  createPatientService,
  deletePatientService,
  getPatientByIdService,
  getPatientService,
  searchPatientService,
  updatePatientService,
} from "../services/patientService.js";

// ===========> Create patient <===========
export const createPatient = async (req, res, next) => {
  try {
    const patient = await createPatientService(req.validatedData, req.user);

    return res
      .status(201)
      .json({ message: "Patien created successfully", patient });
  } catch (error) {
    next(error);
  }
};

// ===========> Get patient <===========
export const getPatients = async (req, res, next) => {
  try {
    const patients = await getPatientService();

    res.status(200).json({ patients });
  } catch (error) {
    next(error);
  }
};

// ===========> Search Patinet information by mobile <===========
export const searchPatient = async (req, res, next) => {
  try {
    const patient = await searchPatientService(req.validatedData);

    res.status(200).json({ patient });
  } catch (error) {
    next(error);
  }
};

// ===========> Get patient by ID <===========
export const getPatientById = async (req, res, next) => {
  try {
    const patient = await getPatientByIdService(req.params);

    res.status(200).json({ patient });
  } catch (error) {
    next(error);
  }
};

// ===========> Update patient <===========
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await updatePatientService(
      req.params,
      req.validatedData,
      req.user
    );

    res.status(200).json({
      message: "Patient updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// ===========> Delete patient <===========
export const deletePatient = async (req, res, next) => {
  try {
    await deletePatientService(req.params, req.user);

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    next(error);
  }
};
