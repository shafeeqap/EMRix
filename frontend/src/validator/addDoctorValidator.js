import { z } from "zod";

const toTimeFormate = ((time) => {
  const [h, m] = time.split(":").map(Number);
  return h >= 0 && h < 24 && m >= 0 && m < 60;
}, "Invalid time value");

const workingHoursSchema = z
  .object({
    workingStart: z
      .string()
      .min(1, "Working hours start time required")
      .regex(/^\d{2}:\d{2}$/, "Time must be HH:MM"),
    workingEnd: z
      .string()
      .min(1, "Working hours end time required")
      .regex(/^\d{2}:\d{2}$/, "Time must be HH:MM"),
  })
  .superRefine((data, ctx) => {
 if(toTimeFormate(data.workingStart) >= toTimeFormate(data.workingEnd)){
ctx.addIssue({
  code: z.ZodIssueCode.custom,
  message: "Working hours start time must be before end time",
  path: ["workingStart"],
}) 
}

  });

export const addDoctorSchema = z.object({
  name: z.string().min(1, "User is required"),
  department: z.string().min(1, "Department required"),
  slotDuration: z.string().min(1, "Slot duration must be greater than 0"),
  workingStart: workingHoursSchema.shape.workingStart,
  workingEnd: workingHoursSchema.shape.workingEnd,
  breakStart: z.string().min(1, "Break start time required"),
  breakEnd: z.string().min(1, "Break end time required"),
});
