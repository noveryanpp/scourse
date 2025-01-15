import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserProgress,
  createUserProgress
} from '../controllers/userController.js'


const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

router.get('/:id/progress', getUserProgress)

router.use(protect);

router.post('/progress', createUserProgress)

export default router;