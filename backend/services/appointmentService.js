import { Doctor } from "../models/Doctor.js";
import { createAppointmentRepo } from "../repositories/appointmentRepository.js";
import { findDoctorById } from "../repositories/doctorRepository.js";
import { logAction } from "../utils/auditLogger.js";

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
