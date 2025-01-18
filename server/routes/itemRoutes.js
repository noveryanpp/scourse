import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from "../controllers/itemController.js";

const router = express.Router();

// Public routes
router.get("/", getItems);
router.get("/:id", getItemById);

// Protected routes
// router.use(protect);

// Student routes
router.post("/", createItem);
router.put("/:id", isAdmin, updateItem);
router.delete("/:id", isAdmin, deleteItem);

export default router;
