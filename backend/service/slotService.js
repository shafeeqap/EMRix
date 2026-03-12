import { Doctor } from "../models/Doctor.js";

export const generateAvailableSlots = async (doctorId, date) => {
  // console.log(doctorId, date, "generateAvailableSlots");

  try {
    const doctor = await Doctor.findOne({ userId: doctorId });
    console.log(doctor, "doctor in generateAvailableSlots");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const workingHours = doctor.workingHours;
    const start = workingHours.start; // e.g., "09:00"
    const end = workingHours.end; // e.g., "13:00"
    const slotDuration = doctor.slotDuration; // Slot duration in minutes. 15 minutes

    const slots = generateSlots(start, end, slotDuration);
    console.log(slots, "generated slots");

    return slots;
  } catch (error) {
    console.error("Error generating available slots:", error);
  }
};

// Generate time slots
function generateSlots(start, end, slotDuration) {
  const slots = [];

  let [hours, minutes] = start.split(":").map(Number);
  let [endHours, endMinutes] = end.split(":").map(Number);

  let currentTime = new Date();
  currentTime.setHours(hours, minutes, 0);

  const endTime = new Date();
  endTime.setHours(endHours, endMinutes, 0);

  while (currentTime < endTime) {
    const time = currentTime.toTimeString().slice(0, 5);

    slots.push(time);

    currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
  }
  
  return slots;
}
