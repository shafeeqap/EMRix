import Appointment from "../models/Appointment.js";
import {
  createAppointmentRepo,
  findAppointment,
  findAppointmentById,
  findAppointmentByIdAndDelete,
  findAppointmentByIdAndUpdate,
  findAppointmentOne,
} from "../repositories/appointmentRepository.js";
import { findDoctorById } from "../repositories/doctorRepository.js";
import { logAction } from "../utils/auditLogger.js";
import { fomattedDate } from "../utils/formatedDated.js";
import { generateAvailableSlots } from "./slotService.js";

// =============> create appointments service <=============
export const createAppointmentService = async (data, user) => {
  const { doctorId, patientId, date, slotTime, notes } = data;

  const appointmentDateTime = new Date(date);
  const [hours, minutes] = slotTime.split(":");

  appointmentDateTime.setHours(hours, minutes, 0, 0);

  if (!doctorId || !patientId || !date || !slotTime || !notes) {
    throw new Error("Missing required fields");
  }

  // Validate slot format (HH:mm)
  if (!/^\d{2}:\d{2}$/.test(slotTime)) {
    throw new Error("Invalid slot format");
  }

  const now = new Date();

  if (appointmentDateTime < now) {
    throw new Error("Past slot not allowed");
  }

  const BUFFER_MINUTES = 15;

  if (user.role !== "admin") {
    const bufferTime = new Date(now.getTime() + BUFFER_MINUTES * 60000);

    if (appointmentDateTime < bufferTime) {
      throw new Error("Slot too close (within buffer time)");
    }
  }

  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // Example: doctor working hours
  // const slotHour = parseInt(hours);

  // if (slotHour < doctor.startHour || slotHour >= doctor.endHour) {
  //   throw new Error("Doctor not available at this time");
  // }

  const existingAppointment = await findAppointmentOne({
    doctorId,
    date,
    slotTime,
    status: "booked",
  });
  console.log(existingAppointment, "Existing appointment");

  if (existingAppointment) {
    throw new Error("Slot already booked");
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

  const { startTime, endTime } = fomattedDate(date);

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
      notes: appointment.notes,
    },
  });
};
