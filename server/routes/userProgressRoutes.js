import express from "express";
import { apiMiddleware } from "../middleware/apiMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAllUserProgress,
  getUserProgress,
  purchaseItem,
  purchaseCourse,
  addItem,
  addScores,
  updateCourseProgress,
  // updateUserProgress,
} from "../controllers/userProgressController.js";

const router = express.Router();

router.get("/", getAllUserProgress);
router.get("/:id", getUserProgress);


router.post("/:userId/additem/:itemId", apiMiddleware, addItem);
router.post("/:userId/addscores/:amount", apiMiddleware, addScores);

router.use(protect);

router.post("/:courseId/finishsection", updateCourseProgress);
router.post("/:userId/purchaseitem/:itemId", purchaseItem);
router.post("/purchasecourse/:id", purchaseCourse);



// router.put('/:id/', updateUserProgress);
export default router;
