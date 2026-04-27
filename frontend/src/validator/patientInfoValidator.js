import { z } from "zod";

export const patientInfoSchema = z.object({
  patient: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  notes: z.string().max(500, "Note must be less than 500 characters").optional(),
});
