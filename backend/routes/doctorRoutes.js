import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createDoctor, getDoctors } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/", protect, authorize("super_admin"), createDoctor);
router.get("/", protect, getDoctors);

export const doctorRoutes = router;
