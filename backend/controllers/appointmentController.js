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
    // console.log(doctorId);

    if (!doctorId || !date) {
      throw new Error("Doctor ID and date are required");
    }

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

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found");
    }

    const isDateChanged =
      new Date(date).getTime() !== new Date(appointment.date).getTime();

    const isSlotChanged = slotTime !== appointment.slotTime;

    if (isDateChanged || isSlotChanged) {
      const slots = await generateAvailableSlots(doctorId, date);

      const availableSlot = slots.includes(slotTime);

      if (!availableSlot) {
        res.status(404);
        throw new Error("Slot not available");
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        doctorId,
        patientId,
        date,
        slotTime,
        notes,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};
