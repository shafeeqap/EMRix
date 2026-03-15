import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAppointment,
  getAppointments,
  getAvailableSlots,
  updateAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/slots", protect, getAvailableSlots);
router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);
router.put("/:id/reschedule", protect, updateAppointments);
router.patch("/:id/status", protect, updateAppointmentStatus);
// router.delete("/:id", protect, deleteAppointment)

export const appointmentRoutes = router;
