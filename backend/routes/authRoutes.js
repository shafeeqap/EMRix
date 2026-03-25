import experss from "express";
import {
  login,
  logout,
  refreshAccessToken,
} from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import { loginSchema } from "../validators/authValidator.js";
import {
  otpLimiter,
  verifyLimiter,
} from "../middleware/rateLimitMiddleware.js";
import { forgotPassword } from "../controllers/forgotPasswordController.js";
import { resetPassword } from "../controllers/resetPasswordController.js";
import { verifyOTP } from "../controllers/verifyOtpController.js";
import { resetPasswordSchema } from "../validators/resetPasswordValidator.js";
import { forgotPasswordSchema } from "../validators/forgotPasswordValidator.js";
import { vefifyOtpSchema } from "../validators/verifyOtpValidator.js";
import { verifyResetToken } from "../middleware/resetMiddleware.js";

const router = experss.Router();

router.post("/login", validate(loginSchema), login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", protect, logout);
router.post(
  "/forgot-password",
  otpLimiter,
  validate(forgotPasswordSchema),
  forgotPassword
);
router.post("/verify-otp", verifyLimiter, validate(vefifyOtpSchema), verifyOTP);
router.post(
  "/reset-password",
  verifyResetToken,
  validate(resetPasswordSchema),
  resetPassword
);

export const authRoutes = router;
