import { z } from "zod";


export const appointmentSchema = z.object({
  name: z.string(),
  doctorId: z.string(),
  patientId: z.string(),
  date: z.string(),
  slotTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)")
    .refine((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
    }, "Invalid time value"),
  notes: z.string(),
});