import Appointment from "../models/Appointment.js";
import { Doctor } from "../models/Doctor.js";

export const generateAvailableSlots = async (doctorId, date) => {
  try {
    const startTime = new Date(date);
    startTime.setUTCHours(0, 0, 0, 0);

    const endTime = new Date(date);
    endTime.setUTCHours(23, 59, 59, 999);

    const doctor = await Doctor.findOne({ _id: doctorId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await Appointment.find({
      doctorId,
      date: { $gte: startTime, $lt: endTime },
    });

    const allSlots = generateSlots(
      doctor.workingHours.start,
      doctor.workingHours.end,
      doctor.slotDuration
    );

    const removeBrkTime = removeBreakTimeSlots(allSlots, doctor.breakTimes);

    const bookedSlots = appointment.map((a) => a.slotTime);

    const availableSlots = removeBookedSlots(removeBrkTime, bookedSlots);

    return availableSlots;
  } catch (error) {
    console.error("Error generating available slots:", error);
  }
};

// Generate time slots
function generateSlots(start, end, slotDuration) {
  const slots = [];

  let [startHours, startMinutes] = start.split(":").map(Number);
  let [endHours, endMinutes] = end.split(":").map(Number);

  let currentTime = new Date();
  currentTime.setHours(startHours, startMinutes, 0);

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
function removeBookedSlots(availableSlots, bookedSlots) {
  return availableSlots.filter((slot) => !bookedSlots.includes(slot));
}
