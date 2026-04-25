import {
  createAppointmentRepo,
  findAppointment,
  findAppointmentById,
  findAppointmentByIdAndDelete,
  findAppointmentByIdAndUpdate,
  findAppointmentOne,
} from "../repositories/appointmentRepository.js";
import { findDoctorById } from "../repositories/doctorRepository.js";
import { AppError } from "../utils/AppError.js";
import { logAction } from "../utils/auditLogger.js";
import { fomattedDate } from "../utils/formatedDated.js";
import { generateAppointmentToken } from "../utils/generateAppointmentToken.js";
import { generateAvailableSlots } from "./slotService.js";

// =============> create appointments service <=============
export const createAppointmentService = async (data, user) => {
  const { doctorId, patientId, date, slotTime, notes } = data;
  console.log(data, "Received appointment data...");

  const appointmentDateTime = new Date(date);
  const [hours, minutes] = slotTime.split(":");

  appointmentDateTime.setHours(hours, minutes, 0, 0);

  const now = new Date();

  if (appointmentDateTime < now) {
    throw new AppError("Past slot not allowed", 405);
  }

  // a minimum time gap before booking allowed for non-admin users to prevent last-minute bookings
  const BUFFER_MINUTES = 15;

  if (user.role !== "super_admin") {
    const bufferTime = new Date(now.getTime() + BUFFER_MINUTES * 60000);

    if (appointmentDateTime < bufferTime) {
      throw new AppError("Slot too close (within buffer time)", 405);
    }
  }

  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  const existingAppointment = await findAppointmentOne({
    doctorId,
    date,
    slotTime,
    status: "booked",
  });

  if (existingAppointment) {
    throw new AppError("Slot already booked", 409);
  }

  const tokenNumber = await generateAppointmentToken(doctorId, date);
  console.log(tokenNumber, "Generated token...");

  const appointment = await createAppointmentRepo({
    doctorId,
    patientId,
    date,
    slotTime,
    tokenNumber,
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

  const { startTime, endTime } = fomattedDate(date);

  const appointments = await findAppointment({
    doctorId,
    date: { $gte: startTime, $lt: endTime },
  });

  return appointments;
};

// =============> Update appointment Status service <=============
export const updateAppointmentStatusService = async (params, data, user) => {
  const id = params.id;
  const { status } = data;

  const appointment = await findAppointmentById(id);

  if (!appointment) {
    throw new AppError("Appointment not found", 404);
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
    throw new AppError("Appointment not found", 404);
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
      throw new AppError("Slot not available", 404);
    }
  }

  const updateData = {};

  if (date) updateData.date = date;
  if (slotTime) updateData.slotTime = slotTime;
  if (notes) updateData.notes = notes;

  const updatedAppointment = await findAppointmentByIdAndUpdate(
    id,
    updateData,
    { returnDocument: "after", runValidators: true }
  );

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_APPOINTMENT",
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
    throw new AppError("Appointment not found", 404);
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
      notes: appointment.notes,
    },
  });
};
