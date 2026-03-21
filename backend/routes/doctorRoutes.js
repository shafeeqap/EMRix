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
import { validate } from "../middleware/validationMiddleware.js";
import {
  createDoctorSchema,
  updateDoctorSchema,
} from "../validators/doctorValidator.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("super_admin"),
  validate(createDoctorSchema),
  createDoctor
);
router.get("/", protect, getDoctors);
router.get("/:id", protect, getDoctorById);
router.put(
  "/:id",
  protect,
  authorize("super_admin"),
  validate(updateDoctorSchema),
  updateDoctor
);
router.delete("/:id", protect, authorize("super_admin"), deleteDoctor);

export const doctorRoutes = router;
