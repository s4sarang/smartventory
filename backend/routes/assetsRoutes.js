import express from 'express';
const assetsRoutes = express.Router();
import asyncHandler from 'express-async-handler';
import assetsModel from '../models/assetsModel.js';

//@desc Fetch all assets
//@route GET /api/assets
//@access Public
assetsRoutes.get(
  '/',
  asyncHandler(async (req, res) => {
    const assets = await assetsModel.find({});

    res.send(assets);
  })
);

//@desc Fetch asset
//@route GET /api/asset/:dlink
//@access Public
assetsRoutes.get(
  '/:dlink',
  asyncHandler(async (req, res) => {
    const asset = await assetsModel.findOne({ link: `${req.params.dlink}` });

    if (asset) {
      res.send(asset);
    } else {
      res.status(404);
      throw Error('Asset Not Found!');
    }
  })
);

export default assetsRoutes;
