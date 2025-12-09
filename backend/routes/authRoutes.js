import express from "express";
import { registerUser, loginUser, updateUser, deleteUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ Ensure user is logged in

const router = express.Router();

// ✅ Register & Login Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Profile Update & Delete Routes (Require Auth)
router.put("/update", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser);

export default router;
