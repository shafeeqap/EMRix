import { z } from "zod";

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(3).regex(/[A-Z]/).regex(/[0-9]/),
});
