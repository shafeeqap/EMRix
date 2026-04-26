import { z } from "zod";


export const appointmentFormSchema = z.object({
  doctorName: z.string(),
  date: z.string(),
  notes: z.string(),
});