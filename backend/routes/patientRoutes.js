import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createPatient, getPatientById, searchPatient, updatePatient } from '../controllers/patientController.js';

const router = express.Router();

router.post('/', protect, createPatient);
router.get("/search", protect, searchPatient)
router.get("/:id", protect, getPatientById)
router.put("/:id", protect, updatePatient)
// router.delete("/:id", protect, getPatientById)

export const patientRoutes = router