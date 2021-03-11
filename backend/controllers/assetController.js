import asyncHandler from 'express-async-handler';
import assetsModel from '../models/assetsModel.js';

//@desc Fetch all assets
//@route GET /api/assets
//@access Public
const getAssets = asyncHandler(async (req, res) => {
  const assets = await assetsModel.find({});
  res.send(assets);
});

//@desc Fetch asset
//@route GET /api/asset/:dlink
//@access Public
const getAssetsByLink = asyncHandler(async (req, res) => {
  const asset = await assetsModel.findOne({ link: `${req.params.dlink}` });
  if (asset) {
    res.send(asset);
  } else {
    res.status(404);
    throw Error('Asset Not Found!');
  }
});

export { getAssets, getAssetsByLink };
