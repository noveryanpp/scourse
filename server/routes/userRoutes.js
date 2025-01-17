import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js'

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

export default router;