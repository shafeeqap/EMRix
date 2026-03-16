import { Doctor } from "../models/Doctor.js";

export const findDoctorById = async (id) => {
  return Doctor.findById(id);
};

export const createDoctorRepo = async (data) => {
  return Doctor.create(data);
};
