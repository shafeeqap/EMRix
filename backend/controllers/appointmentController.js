import Appointment from "../models/Appointment.js";
import { generateAvailableSlots } from "../service/slotService.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  const date = req.body.date;

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return res.status(400).json({ message: "Past slot not allowed" });
  }

  try {
    const appointment = await Appointment.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res
      .status(201)
      .json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctorId", "name")
      .populate("patientId", "name");

    // console.log(appointments, 'Appointment...');

    res.status(200).json({ appointments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// Get available time slots for a doctor
export const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    const slots = await generateAvailableSlots(doctorId, date);

    res.status(200).json({ slots });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server Error", error: error.message });
  }
};
