import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { register, login, getProfile, getUsers, updateUserRole, deleteUser, updateProfile } from "../controllers/authController.js";

const router = express.Router();

// Input validation middleware
const validateRegistration = (req, res, next) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName || !username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please provide a valid email address",
    });
  }

  next();
};

// Public routes
router.post("/register", validateRegistration, register);
router.post("/login", login);

// Protected routes
router.use(protect);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

// Admin routes
router.get("/users", protect, isAdmin, getUsers);
router.put("/users/:id/role", protect, isAdmin, updateUserRole);
router.delete("/users/:id", protect, isAdmin, deleteUser);

export default router;
