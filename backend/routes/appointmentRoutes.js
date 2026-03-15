import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAppointment,
  getAppointments,
  getAvailableSlots,
  updateStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/slots", protect, getAvailableSlots);
router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);
// router.put("/:id", protect, updateAppointments);
router.patch("/:id", protect, updateStatus);

export const appointmentRoutes = router;
