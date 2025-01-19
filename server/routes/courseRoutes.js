import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isTeacher } from "../middleware/roleMiddleware.js";
import { isEnrolled } from "../middleware/courseMiddleware.js";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  addReview,
  updateReview,
  deleteReview,
  getUserCourses,
  getCourseSection,
} from "../controllers/courseController.js";

const router = express.Router();

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Protected routes
router.use(protect);

router.get("/:userId/ownedCourses", getUserCourses);
router.get("/:courseId/section/:sectionId", getCourseSection);
router.get("/:courseId/section/", getCourseSection);

// Student routes
router.post("/:id/enroll", enrollCourse);
router.post("/:id/reviews", addReview);
router.put("/:id/reviews", updateReview);
router.delete("/:id/reviews", deleteReview);

// Teacher routes
router.post("/", isTeacher, createCourse);
router.put("/:id", isTeacher, updateCourse);
router.delete("/:id", isTeacher, deleteCourse);

//  routes
// router.post("/:id/lessons", isTeacher, addLesson);
// router.get("/:courseId/lessons/:lessonId", protect, getLessonById);
// router.put("/:courseId/lessons/:lessonId", isTeacher, updateLesson);
// router.delete("/:courseId/lessons/:lessonId", isTeacher, deleteLesson);
// router.put("/:id/lessons/reorder", isTeacher, reorderLessons);

export default router;
