import { Doctor } from "../models/Doctor";

export const generateAvailableSlots = async (doctorId, date) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    // console.log(doctor);
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const workingHours = doctor.workingHours;
    const startTime = workingHours.start; // e.g., "09:00"
    const endTime = workingHours.end; // e.g., "13:00"
    const slotDuration = doctor.slotDuration; // Slot duration in minutes. 15 minutes

    function getTimeSlots(startTime, endTime, slotDuration) {
      const slots = [];

      let [hours, minutes] = startTime.split(":").map(Number);
      let [endHours, endMinutes] = endTime.split(":").map(Number);

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

    const availableSlots = getTimeSlots(startTime, endTime, slotDuration);
  } catch (error) {
    console.error("Error generating available slots:", error);
  }
};
