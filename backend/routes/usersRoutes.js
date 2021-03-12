import express, { Router } from 'express';
const router = express.Router();
import { getAssets, getAssetsByLink } from '../controllers/assetController.js';
import authUser from '../controllers/usersController.js';

router.post('/login', authUser);

export default router;
