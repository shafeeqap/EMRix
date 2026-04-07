import { z } from "zod";

export const addDoctorSchema = z.object({
  name: z.string().min(1, "User is required"),
  department: z.string().min(1, "Department required"),
  slotDuration: z.string().min(1, "Slot duration must be greater than 0"),
  workingStart: z.string().min(1, "Working hours start time required"),
  workingEnd: z.string().min(1, "Working hours end time required"),
  breakStart: z.string().min(1, "Break start time required"),
  breakEnd: z.string().min(1, "Break end time required"),
});
