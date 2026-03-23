import { z } from "zod";

export const vefifyOtpSchema = z.object({
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  otp: z.string().length(6),
});
