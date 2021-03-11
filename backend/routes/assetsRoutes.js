import express, { Router } from 'express';
const assetsRoutes = express.Router();
import { getAssets, getAssetsByLink } from '../controllers/assetController.js';

assetsRoutes.route('/').get(getAssets);
assetsRoutes.route('/:dlink').get(getAssetsByLink);

export default assetsRoutes;
