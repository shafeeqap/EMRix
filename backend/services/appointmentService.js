import Appointment from "../models/Appointment.js";
import {
  createAppointmentRepo,
  findAppointment,
  findAppointmentById,
  findAppointmentByIdAndDelete,
  findAppointmentByIdAndUpdate,
} from "../repositories/appointmentRepository.js";
import { findDoctorById } from "../repositories/doctorRepository.js";
import { logAction } from "../utils/auditLogger.js";
import { fomatedDate } from "../utils/formatedDated.js";
import { generateAvailableSlots } from "./slotService.js";

// =============> create appointments service <=============
export const createAppointmentService = async (data, user) => {
  const { doctorId, patientId, date, slotTime, notes } = data;

  if (!doctorId || !patientId || !date || !slotTime || !notes) {
    throw new Error("Missing required fields");
  }

  const selectedDate = new Date(date);

  if (isNaN(selectedDate)) {
    throw new Error("Invalid date format");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    res.status(400);
    throw new Error("Past slot not allowed");
  }

  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const appointment = await createAppointmentRepo({
    doctorId,
    patientId,
    date,
    slotTime,
    notes,
    createdBy: user.id,
  });

  await logAction({
    userId: user.id,
    role: user.role,
    action: "CREATE_APPOINTMENT",
    entity: "Appointment",
    entityId: appointment._id,
    metadata: {
      patientId,
      doctorId,
      slot: slotTime,
      date,
    },
  });

  return appointment;
};

// =============> Get appointments service <=============
export const getAppointmentService = async (query) => {
  const { doctorId, date } = query;

  if (!doctorId || !date) {
    throw new Error("Doctor ID and date are required");
  }

  const { startTime, endTime } = fomatedDate(date);

  const appointments = await findAppointment({
    doctorId,
    date: { $gte: startTime, $lt: endTime },
  })
    .populate("doctorId", "name")
    .populate("patientId", "name");

  return appointments;
};

// =============> Update appointment Status service <=============
export const updateAppointmentStatusService = async (params, data, user) => {
  const id = params.id;
  const { status } = data;

  const appointment = await findAppointmentById(id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  appointment.status = status;
  await appointment.save();

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_APPOINTMENT_STATUS",
    entity: "Appointment",
    entityId: appointment._id,
    metadata: {
      oldStatus: "booked",
      newStatus: status,
    },
  });

  return appointment;
};

// =============> Update appointments service <=============
export const updateAppointmentService = async (params, data, user) => {
  const id = params.id;
  const { date, slotTime, notes } = data;

  const appointment = await findAppointmentById(id);
  if (!appointment) {
    throw new Error("Appointment not found");
  }

  const isDateChanged =
    date && new Date(date).getTime() !== new Date(appointment.date).getTime();

  const isSlotChanged = slotTime && slotTime !== appointment.slotTime;

  if (isDateChanged || isSlotChanged) {
    const slots = await generateAvailableSlots({
      doctorId: appointment.doctorId,
      date: date,
    });

    const availableSlot = slots.includes(slotTime);

    if (!availableSlot) {
      throw new Error("Slot not available");
    }
  }

  const updateData = {};

  if (date) updateData.date = date;
  if (slotTime) updateData.slotTime = slotTime;
  if (notes) updateData.notes = notes;

  const updatedAppointment = await findAppointmentByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );

  console.log(updatedAppointment, "updatedAppointment service...");

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDAGE_APPOINTMENT",
    entity: "Appointment",
    entityId: appointment._id,
    metadata: {
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      slotTime,
      date,
      notes,
      status: appointment.status,
    },
  });

  return updatedAppointment;
};

// =============> Update appointments service <=============
export const deleteAppointmentService = async (params, user) => {
  const id = params.id;

  const appointment = await findAppointmentById(id);
  if (!appointment) {
    throw new Error("Appointment not found");
  }

  await findAppointmentByIdAndDelete(id);

  await logAction({
    userId: user.id,
    role: user.role,
    action: "DELETE_APPOINTMENT",
    entity: "Appointment",
    entityId: appointment._id,
    metadata: {
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      lastStatus: appointment.status,
      notes: appointment.notes
    },
  });
};
