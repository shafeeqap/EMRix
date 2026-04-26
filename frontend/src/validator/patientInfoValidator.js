import { z } from "zod";

export const patientInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  note: z.string().max(500, "Note must be less than 500 characters").optional(),
});
