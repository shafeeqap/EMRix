import Appointment from "../models/Appointment.js";
import { Doctor } from "../models/Doctor.js";

export const generateAvailableSlots = async (doctorId, date) => {
  // console.log(doctorId, date, "generateAvailableSlots");
  try {
    const doctor = await Doctor.findOne({ userId: doctorId });
    console.log(doctor, "doctor in generateAvailableSlots");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await Appointment.find({ doctorId, date });

    const workingHours = doctor.workingHours;
    const start = workingHours.start; // e.g., "09:00"
    const end = workingHours.end; // e.g., "13:00"
    const slotDuration = doctor.slotDuration; // Slot duration in minutes. 15 minutes

    const breakTimes = doctor.breakTimes; // Array of break times, e.g., ["12:00", "12:15"]

    const slots = generateSlots(start, end, slotDuration);
    // console.log(slots, "generated slots");
    const availableSlots = removeBreakTimeSlots(slots, breakTimes);
    // console.log(availableSlots, "available slots after removing break times");

    const bookedSlots = appointment.map((a) => a.slotTime);
    const removeBkdSlots = removeBookedSlots(availableSlots, bookedSlots);
    console.log(removeBkdSlots, 'remove booked slots');
    

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

// Remove break time slots from the available slots
function removeBreakTimeSlots(slots, breakTimes) {
  console.log(breakTimes, "break times in removeBreakTimeSlots");

  return slots.filter((slot) => {
    for (const breakTime of breakTimes) {
      if (slot >= breakTime.start && slot < breakTime.end) {
        return false; // remove this slot if it falls within the break time
      }
    }

    return true; // keep this slot if it does not fall within any break time
  });
}

// Remove booked slots from the available slots
function removeBookedSlots(slots, bookedSlots) {

}