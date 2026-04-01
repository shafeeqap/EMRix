import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password required")
    .min(3, "Password must be at least 3 characters")
    .refine((val) => !/\s/.test(val), {
      message: "Password should not contain spaces",
    })
    // .refine((val) => !/^\d+$/.test(val), {
    //   message: "Password cannot be only numbers",
    // }),
});
