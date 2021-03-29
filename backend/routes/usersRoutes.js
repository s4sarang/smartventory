import express, { Router } from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUser,
  updateUserProfile,
  getUsers,
} from '../controllers/usersController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUser).put(protect, updateUserProfile);

export default router;
