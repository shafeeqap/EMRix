import Appointment from "../models/Appointment.js";
import { Doctor } from "../models/Doctor.js";
import { fomatedDate } from "../utils/formatedDated.js";

// =============> generate available slots <=============
export const generateAvailableSlots = async (doctorId, date, next) => {
  try {
    const { startTime, endTime } = fomatedDate(date);

    const doctor = await Doctor.findOne({ _id: doctorId });
    console.log(doctor, 'Docter in serviceslot...');
    

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const appointments = await Appointment.find(
      {
        doctorId,
        date: { $gte: startTime, $lt: endTime },
      },
      { slotTime: 1, _id: 0 }
    ).lean();

    const bookedSlots = new Set(appointments.map((a) => a.slotTime));

    const allSlots = generateSlots(
      doctor.workingHours.start,
      doctor.workingHours.end,
      doctor.slotDuration
    );

    const slotsWithoutBreaks = removeBreakTimeSlots(
      allSlots,
      doctor.breakTimes
    );

    const availableSlots = slotsWithoutBreaks.filter(
      (slot) => !bookedSlots.has(slot)
    );

    return availableSlots;
  } catch (error) {
    next(error);
  }
};

// =============> Generate time slots <=============
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

// =============> Remove break time slots from the available slots <=============
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
