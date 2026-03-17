import Appointment from "../models/Appointment.js";

export const createAppointmentRepo = async (data) => {
  return Appointment.create(data);
};

export const findAppointmentById = async (id) => {
  return Appointment.findById(id);
};

export const findAppointment = (filter) => {
  return Appointment.find(filter);
};

export const findAppointmentByIdAndUpdate = (id, update, options) => {
  return Appointment.findByIdAndUpdate(id, update, options);
};

export const findAppointmentByIdAndDelete = async (id) => {
  return Appointment.findByIdAndDelete(id);
};
