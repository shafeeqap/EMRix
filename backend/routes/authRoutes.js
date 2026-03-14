import experss from "express";
import { login, logout, refreshAccessToken } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = experss.Router();

router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", protect, logout);

export const authRoutes = router;
