import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", protect, authorize("super_admin"), createUser);
router.get("/", protect, authorize("super_admin"), getUsers);
router.get("/:id", protect, authorize("super_admin"), getUserById);
router.put("/:id", protect, authorize("super_admin"), updateUserById);
router.delete("/:id", protect, authorize("super_admin"), deleteUser);

export const userRoutes = router;
