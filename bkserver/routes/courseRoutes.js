import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { isTeacher } from '../middleware/roleMiddleware.js'
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
  addLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
  reorderLessons
} from '../controllers/courseController.js'

const router = express.Router()

// Public routes
router.get('/', getCourses)
router.get('/:id', getCourseById)

// Protected routes
router.use(protect)

// Student routes
router.post('/:id/enroll', enrollCourse)
router.post('/:id/reviews', addReview)
router.put('/:id/reviews', updateReview)
router.delete('/:id/reviews', deleteReview)

// Teacher routes
router.post('/', isTeacher, createCourse)
router.put('/:id', isTeacher, updateCourse)
router.delete('/:id', isTeacher, deleteCourse)

// Lesson routes
router.post('/:id/lessons', isTeacher, addLesson)
router.get('/:courseId/lessons/:lessonId', protect, getLessonById)
router.put('/:courseId/lessons/:lessonId', isTeacher, updateLesson)
router.delete('/:courseId/lessons/:lessonId', isTeacher, deleteLesson)
router.put('/:id/lessons/reorder', isTeacher, reorderLessons)

export default router