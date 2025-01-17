import express from 'express'
const { purchase, notification } = require('../controllers/paymentController');

const router = express.Router();

router.post('/purchase', purchase);
router.post('/notification', notification);

module.exports = router;