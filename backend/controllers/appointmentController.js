import { generateAvailableSlots } from "../services/slotService.js";
import {
  createAppointmentService,
  getAppointmentService,
  updateAppointmentStatusService,
  updateAppointmentService,
  deleteAppointmentService,
} from "../services/appointmentService.js";

// =============> Create a new appointment <=============
export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await createAppointmentService(req.body, req.user);
    res
      .status(201)
      .json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      throw new Error(
        "Slot just got booked by someone else. Please choose another."
      );
    }

    next(error);
  }
};

// =============> Get all appointments <=============
export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await getAppointmentService(req.query);

    res.status(200).json({ appointments });
  } catch (error) {
    next(error);
  }
};

// =============> Get available time slots for a doctor <=============
export const getAvailableSlots = async (req, res, next) => {
  try {
    const slots = await generateAvailableSlots(req.query);

    res.status(200).json({ slots });
  } catch (error) {
    next(error);
  }
};

// =============> Update appointment status <=============
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const appointment = await updateAppointmentStatusService(
      req.params,
      req.body,
      req.user
    );

    res.status(200).json({
      message: "Status updated successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// =============> Update appointment <=============
export const updateAppointments = async (req, res, next) => {
  try {
    const updatedAppointment = await updateAppointmentService(
      req.params,
      req.body,
      req.user
    );

    console.log(updatedAppointment, 'updated appointment...');
    
    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};

// =============> Delete Appointment <=============
export const deleteAppointment = async (req, res, next) => {
  try {
    await deleteAppointmentService(req.params, req.user);

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
