import express, { Router } from 'express';
const router = express.Router();
import {
  deleteAsset,
  getAssets,
  getAssetsByLink,
  createAsset,
  updateAsset,
  getTopAssets,
} from '../controllers/assetController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getAssets).post(protect, isAdmin, createAsset);
router.route('/top').get(getTopAssets);
router
  .route('/:dlink')
  .get(getAssetsByLink)
  .delete(protect, isAdmin, deleteAsset)
  .put(protect, isAdmin, updateAsset);

export default router;
