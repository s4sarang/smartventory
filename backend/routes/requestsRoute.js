import express, { Router } from 'express';
const router = express.Router();

import { addRequestsItems } from '../controllers/requestsController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addRequestsItems);

export default router;
