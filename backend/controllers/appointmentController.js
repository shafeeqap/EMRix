import Appointment from "../models/Appointment.js";
import { logAction } from "../service/auditService.js";
import { generateAvailableSlots } from "../service/slotService.js";
import { fomatedDate } from "../utils/formatedDated.js";

// =============> Create a new appointment <=============
export const createAppointment = async (req, res, next) => {
  const date = req.body.date;

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    res.status(400);
    throw new Error("Past slot not allowed");
  }

  try {
    const appointment = await Appointment.create({
      ...req.body,
      createdBy: req.user.id,
    });

    await logAction({
      userId: req.user.id,
      role: req.user.role,
      action: "CREATE_APPOINTMENT",
      entity: "Appointment",
      entityId: appointment._id,
      metadata: {
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        slot: appointment.slotTime,
        date: appointment.date,
      },
    });

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

    const {startTime, endTime} = fomatedDate(date)

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
export const updateStatus = async (req, res, next) => {
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
