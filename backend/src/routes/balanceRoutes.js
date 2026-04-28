import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getGroupBalance, getUserSummary } from '../controllers/balanceController.js';

const router = express.Router();

router.get('/summary', protect, getUserSummary);
router.get('/:groupId', protect, getGroupBalance);

export default router;
