import experss from "express";
import { login, refreshToken } from "../controllers/authControllers.js";

const router = experss.Router();

router.post("/login", login);
router.post("/refresh-token", refreshToken);

export const authRoutes = router;
