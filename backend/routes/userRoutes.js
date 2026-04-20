import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  searchUsers,
  updateUserById,
  updateUserStatus,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", protect, authorize("super_admin"), createUser);
router.get("/", protect, authorize("super_admin"), getUsers);
router.get("/search", protect, authorize("super_admin"), searchUsers);
router.get("/:id", protect, authorize("super_admin"), getUserById);
router.patch("/:id", protect, authorize("super_admin"), updateUserById);
router.patch("/:id/status", protect, authorize("super_admin"), updateUserStatus);
router.delete("/:id", protect, authorize("super_admin"), deleteUser);

export const userRoutes = router;
