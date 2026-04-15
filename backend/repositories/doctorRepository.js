import { Doctor } from "../models/Doctor.js";

export const createDoctorRepo = async (data) => {
  return Doctor.create(data);
};

export const findDoctors = async (filter, skip, limit) => {
  return Doctor.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("userId", "firstName lastName");
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

export const countDoctorDocuments = async (fliter) => {
  return Doctor.countDocuments(fliter);
};
