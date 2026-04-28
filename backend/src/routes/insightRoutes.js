import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserInsights } from '../controllers/insightController.js';

const router = express.Router();

router.get('/user', protect, getUserInsights);

export default router;
