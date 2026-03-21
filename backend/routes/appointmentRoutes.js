import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAvailableSlots,
  updateAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  appointmentSchema,
  updateAppointmentSchema,
} from "../validators/appointmentValidator.js";

const router = express.Router();

router.get("/slots", protect, getAvailableSlots);
router.post("/", protect, validate(appointmentSchema), createAppointment);
router.get("/", protect, getAppointments);
router.put(
  "/:id/reschedule",
  protect,
  validate(updateAppointmentSchema),
  updateAppointments
);
router.patch("/:id/status", protect, updateAppointmentStatus);
router.delete("/:id", protect, deleteAppointment);

export const appointmentRoutes = router;
