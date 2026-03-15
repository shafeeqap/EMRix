import Appointment from "../models/Appointment.js";

export const createAppointmentRepo = async (data) => {
  return Appointment.create(data);
};
