import express, { Router } from 'express';
const router = express.Router();
import { getAssets, getAssetsByLink } from '../controllers/assetController.js';
import { authUser, getUser } from '../controllers/usersController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.route('/profile').get(protect, getUser);

export default router;
