import { z } from "zod";

export const editAppointmentSchema = z.object({
  doctorId: z.string().min(1, "Doctor is required"),

  date: z.string().min(1, "Date is required"),

  slotTime: z.string().min(1, "Slot time is required"),

  notes: z
    .string()
    .max(500, "Note must be less than 500 characters")
    .optional(),
});
