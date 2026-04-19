import { z } from "zod";

const roles = ["admin", "doctor", "receptionist"];

export const addUserSchema = z.object({
  firstName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  lastName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters"),
  email: z.string().min(1, "Email required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password required")
    .min(3, "Password must be at least 3 characters")
    .refine((val) => !/\s/.test(val), {
      message: "Password should not contain spaces",
    })
    .refine((val) => !/^\d+$/.test(val), {
      message: "Password cannot be only numbers",
    }),
  role: z
    .string()
    .toLowerCase()
    .refine((val) => roles.includes(val), {
      message: "Invalid role",
    }),
});
