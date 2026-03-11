import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctors,
  updateDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/", protect, authorize("super_admin"), createDoctor);
router.get("/", protect, getDoctors);
router.get("/:id", protect, getDoctorById);
router.put("/", protect, authorize("super_admin"), updateDoctor);
router.delete("/", protect, authorize("super_admin"), deleteDoctor);

export const doctorRoutes = router;
