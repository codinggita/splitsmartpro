import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createSettlement,
  getSettlementsByGroup,
} from '../controllers/settlementController.js';

const router = express.Router();

router.post('/', protect, createSettlement);
router.get('/:groupId', protect, getSettlementsByGroup);

export default router;
