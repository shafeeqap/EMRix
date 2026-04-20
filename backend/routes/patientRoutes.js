import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPatient,
  deletePatient,
  getPatientById,
  getPatientFullDetails,
  getPatients,
  searchPatient,
  updatePatient,
} from "../controllers/patientController.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  createPatientSchema,
  searchPatientSchema,
  updatePatientSchema,
} from "../validators/patientValidator.js";

const router = express.Router();

router.get("/", protect, getPatients);
router.post("/", protect, validate(createPatientSchema), createPatient);
router.get(
  "/search",
  protect,
  validate(searchPatientSchema, "query"),
  searchPatient
); // pending for remove
router.get("/:id", protect, getPatientById);
router.get("/:id/details", protect, getPatientFullDetails);
router.put("/:id", protect, validate(updatePatientSchema), updatePatient);
router.delete("/:id", protect, deletePatient);

export const patientRoutes = router;
