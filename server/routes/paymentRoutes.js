import express from "express";
import { purchase, notification } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/purchase", purchase);
router.post("/notification", notification);

export default router;