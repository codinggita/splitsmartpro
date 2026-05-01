import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createGroup,
  getGroups,
  getGroupById,
  joinGroup,
  deleteGroup,
  markGroupAsSettled,
} from '../controllers/groupController.js';

const router = express.Router();

router.route('/')
  .post(protect, createGroup)
  .get(protect, getGroups);

router.route('/join')
  .post(protect, joinGroup);

router.route('/:id')
  .get(protect, getGroupById)
  .delete(protect, deleteGroup);

router.route('/:id/settle')
  .patch(protect, markGroupAsSettled);

export default router;
