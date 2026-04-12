import { z } from "zod";

const timeRegex = /^\d{2}:\d{2}$/;

const toMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const addDoctorSchema = z
  .object({
    name: z.string().min(1, "User is required"),
    department: z.string().min(1, "Department required"),
    slotDuration: z.string().min(1, "Slot duration must be greater than 0"),
    workingStart: z
      .string()
      .min(1, "Working hours start time required")
      .regex(timeRegex, "Time must be HH:MM"),
    workingEnd: z
      .string()
      .min(1, "Working hours end time required")
      .regex(timeRegex, "Time must be HH:MM"),

    hasBreak: z.boolean(),
    breakStart: z
      .string()
      .min(1, "Break start time required")
      .regex(timeRegex, "Time must be HH:MM")
      .optional(),
    breakEnd: z
      .string()
      .min(1, "Break end time required")
      .regex(timeRegex, "Time must be HH:MM")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // working hours validation
    if (toMinutes(data.workingStart) >= toMinutes(data.workingEnd)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Working hours start time must be before end time",
        path: ["workingStart"],
      });
    }

    // Only validate break if enabled
    if (data.hasBreak) {
      if (!data.breakStart || !data.breakEnd) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Break time is required",
          path: ["breakStart"],
        });
        return;
      }
    }

    // break time validation
    if (toMinutes(data.breakStart) >= toMinutes(data.breakEnd)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Break start must be before break end",
        path: ["breakStart"],
      });
    }
    // break must be inside working hours
    if (
      toMinutes(data.breakStart) < toMinutes(data.workingStart) ||
      toMinutes(data.breakEnd) > toMinutes(data.workingEnd)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Break time must be within working hours",
        path: ["breakStart"],
      });
    }
  });
