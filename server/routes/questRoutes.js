import express from 'express';
import {getQuests, getQuestById, createQuest, updateQuest } from '../controllers/questController.js';
import { isAdmin } from '../middleware/roleMiddleware.js'

const router = express.Router();

router.get('/', getQuests);
router.get('/:id', getQuestById);

router.post('/', isAdmin, createQuest);
router.put('/:id', isAdmin, updateQuest);