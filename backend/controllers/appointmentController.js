import Appointment from "../models/Appointment.js";
import { logAction } from "../utils/auditLogger.js";
import { generateAvailableSlots } from "../services/slotService.js";
import { fomatedDate } from "../utils/formatedDated.js";
import { createAppointmentService } from "../services/appointmentService.js";

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
      throw new Error("Time slot already booked");
    }

    next(error);
  }
};

// =============> Get all appointments <=============
export const getAppointments = async (req, res, next) => {
  try {
    const { doctorId, date } = req.query;

    const { startTime, endTime } = fomatedDate(date);

    const appointments = await Appointment.find({
      doctorId,
      date: { $gte: startTime, $lt: endTime },
    })
      .populate("doctorId", "name")
      .populate("patientId", "name");

    res.status(200).json({ appointments });
  } catch (error) {
    next(error);
  }
};

// =============> Get available time slots for a doctor <=============
export const getAvailableSlots = async (req, res, next) => {
  try {
    const { doctorId, date } = req.query;

    const slots = await generateAvailableSlots(doctorId, date);

    res.status(200).json({ slots });
  } catch (error) {
    next(error);
  }
};

// =============> Update appointment status <=============
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found");
    }

    appointment.status = status;
    await appointment.save();

    await logAction({
      userId: req.user.id,
      role: req.user.role,
      action: "UPDATE_APPOINTMENT_STATUS",
      entity: "Appointment",
      entityId: appointment._id,
      metadata: {
        oldStatus: "booked",
        newStatus: status,
      },
    });

    res.status(200).json({
      message: "Status updated successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointments = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { doctorId, patientId, date, slotTime, notes } = req.body;
    // console.log(req.body, "Request body...");
    // console.log(slotTime, "new Slot time");
    // console.log(date, "New date");

    const appointment = await Appointment.findById(id);
    // console.log(appointment, "Appointment...");

    const slots = await generateAvailableSlots(doctorId, date);
    // console.log(slots, "Available slot...");

    const availableSlot = slots.map((slot) => {
      return slot.filter((s) => s === slotTime);
    });

    if (!availableSlot) {
      res.status(404);
      throw new Error("Slot not available");
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
      doctorId,
      patientId,
      date,
      slotTime,
      notes,
    });

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};
