import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAppointment,
  getAppointments,
  getAvailableSlots,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);
router.get("/slots", protect, getAvailableSlots);

export const appointmentRoutes = router;
