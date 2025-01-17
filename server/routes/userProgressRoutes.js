import express from 'express';
// import { apiMiddleware } from "../middleware/apiMiddleware.js";
import {
    getAllUserProgress,
    getUserProgress,
    // updateUserProgress,
} from '../controllers/userProgressController.js'

router.get('/', getAllUserProgress);
router.get('/:id', getUserProgress);

// router.use(apiMiddleware);

// router.put('/:id/', updateUserProgress);