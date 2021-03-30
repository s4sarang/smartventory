import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/usersController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUser).put(protect, updateUserProfile);
router.route('/:id').delete(protect, isAdmin, deleteUser);

export default router;
