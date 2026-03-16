import Appointment from "../models/Appointment.js";

export const createAppointmentRepo = async (data) => {
  return Appointment.create(data);
};

export const findAppointmentById = async (id) => {
  return Appointment.findById(id);
};
