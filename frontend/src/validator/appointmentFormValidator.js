import { z } from "zod";

export const appointmentFormSchema = z.object({
  doctor: z
    .object({
      _id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Doctor is required",
    }),

  date: z.string().min(1, "Date is required"),

  patient: z
    .object({
      _id: z.string(),
      name: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Patient is required",
    }),
  notes: z
    .string()
    .max(500, "Note must be less than 500 characters")
    .optional(),
});
