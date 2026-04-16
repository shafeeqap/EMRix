import { Patient } from "../models/Patient.js";

export const createPatientRepo = async (data) => {
  return Patient.create(data);
};

export const findPatient = async () => {
  return Patient.find();
};

export const findOnePatient = async (filter) => {
  return Patient.findOne(filter);
};

export const findPatientById = async (id) => {
  return Patient.findById(id);
};

export const findPatientByIdAndUpdate = async (id, update, options) => {
  return Patient.findByIdAndUpdate(id, update, options);
};

export const findPatientByIdAndDelete = async (id) => {
  return Patient.findByIdAndDelete(id);
};
