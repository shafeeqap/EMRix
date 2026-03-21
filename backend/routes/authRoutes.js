import experss from "express";
import { login, logout, refreshAccessToken } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import { loginSchema } from "../validators/authValidator.js";

const router = experss.Router();

router.post("/login", validate(loginSchema), login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", protect, logout);

export const authRoutes = router;
