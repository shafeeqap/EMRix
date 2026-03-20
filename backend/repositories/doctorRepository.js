import { Doctor } from "../models/Doctor.js";

export const createDoctorRepo = async (data) => {
  return Doctor.create(data);
};

export const findDoctors = () => {
  return Doctor.find();
};

export const findDoctorById = (id) => {
  return Doctor.findById(id);
};

export const findDoctorOne = async (id) => {
  return Doctor.findOne(id);
};

export const findDoctorByIdAndUpdate = async (id, update, options) => {
  return Doctor.findByIdAndUpdate(id, update, options);
};

export const findDoctorByEmail = async (email) => {
  return Doctor.findOne({ email });
};

export const findDoctorByIdAndDelete = async (id) => {
  return Doctor.findByIdAndDelete(id);
};
