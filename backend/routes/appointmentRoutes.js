import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);

export const appointmentRoutes = router;
