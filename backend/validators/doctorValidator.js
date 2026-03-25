import { z } from "zod";

const timeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}$/, "Time must be HH:MM")
  .refine((time) => {
    const [h, m] = time.split(":").map(Number);
    return h >= 0 && h < 24 && m >= 0 && m < 60;
  }, "Invalid time value");

// create doctor validation
export const createDoctorSchema = z.object({
  userId: z.string(),
  firstName: z
    .string()
    .min(2, "First name too short")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  lastName: z
    .string()
    .min(1, "Last name required")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  email: z.email("Invalid email"),
  department: z.string().min(2, "Department required"),
  workingHours: z.object({
    start: timeSchema,
    end: timeSchema,
  }),
  slotDuration: z.number().int().positive("Slot duration must be positive"),
  breakTimes: z
    .array(
      z
        .object({
          start: timeSchema,
          end: timeSchema,
        })
        .refine(
          ({ start, end }) => start < end,
          "Break start must be before end"
        )
    )
    .optional(),
});

// update doctor validation
export const updateDoctorSchema = z.object({
  firstName: z.string().min(2, "First name too short"),
  lastName: z.string().min(1, "Last name required"),
  email: z.email("Invalid email"),
  department: z.string().min(2, "Department required"),
  workingHours: z.object({
    start: timeSchema,
    end: timeSchema,
  }),
  slotDuration: z.number().int().positive("Slot duration must be positive"),
  breakTimes: z.array(
    z
      .object({
        start: timeSchema,
        end: timeSchema,
      })
      .refine(({ start, end }) => start < end, "Break start must be before end")
  ),
});
