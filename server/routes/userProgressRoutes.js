import express from 'express';
import { apiMiddleware } from "../middleware/apiMiddleware.js";
import {
    getAllUserProgress,
    getUserProgress,
    purchaseItem,
    purchaseCourse,
    addItem,
    addScores,
    // updateUserProgress,
} from '../controllers/userProgressController.js'

const router = express.Router()

router.get('/', getAllUserProgress);
router.get('/:id', getUserProgress);

router.post('/:userId/purchaseitem/:itemId', purchaseItem);
router.post('/:userId/purchasecourse/:courseId', purchaseCourse);

router.use(apiMiddleware);

router.post('/:userId/additem/:itemId', addItem);
router.post('/:userId/addscores/:amount', addScores);

// router.put('/:id/', updateUserProgress);
export default router