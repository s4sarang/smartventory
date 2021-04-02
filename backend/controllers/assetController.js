import asyncHandler from 'express-async-handler';
import Assets from '../models/assetsModel.js';

//@desc Fetch all assets
//@route GET /api/assets
//@access Public
const getAssets = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        link: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Assets.countDocuments({ ...keyword });
  const assets = await Assets.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.send({ assets, page, pages: Math.ceil(count / pageSize) });
});

//@desc Fetch asset
//@route GET /api/asset/:dlink
//@access Public
const getAssetsByLink = asyncHandler(async (req, res) => {
  const check = await Assets.findOne({ link: `${req.params.dlink}` });
  const asset = await Assets.findById(check._id);
  if (asset) {
    res.send(asset);
  } else {
    res.status(404);
    throw Error('Asset Not Found!');
  }
});

//@desc delete asset
//@route DELETE /api/assets/:dlink
//@access Private/Admin
const deleteAsset = asyncHandler(async (req, res) => {
  const asset = await Assets.findOne({ link: `${req.params.dlink}` });
  if (asset) {
    await asset.remove();
    res.json({ message: 'Asset removed!' });
  } else {
    res.status(404);
    throw Error('Asset Not Found!');
  }
});

//@desc create asset
//@route POST /api/assets
//@access Private/Admin
const createAsset = asyncHandler(async (req, res) => {
  const asset = new Assets({
    user: req.user._id,
    link: 'sample-link',
    brand: 'sample brand',
    model: 'sample model',
    count: 0,
    path: 'images/sample.jpg',
    launch: 0,
    price: 0,
    category: 'sample category',
  });

  if (asset) {
    const createdAsset = await asset.save();
    res.status(201).json(createdAsset);
  }
});

//@desc update asset
//@route PUT /api/assets/:dlink
//@access Private/Admin
const updateAsset = asyncHandler(async (req, res) => {
  const { link, brand, model, count, path, launch, price, category } = req.body;

  const asset = await Assets.findOne({ link: `${req.params.dlink}` });

  if (asset) {
    asset.link = link;
    asset.brand = brand;
    asset.model = model;
    asset.count = count;
    asset.path = path;
    asset.launch = launch;
    asset.price = price;
    asset.category = category;

    const updatedAsset = await asset.save();
    res.status(201).json(updatedAsset);
  } else {
    res.status(404);
    throw Error('Asset Not Found!');
  }
});

//@desc get top assets
//@route GET /api/assets/top
//@access Public
const getTopAssets = asyncHandler(async (req, res) => {
  const assets = await Assets.find({}).sort({ count: -1 }).limit(3);
  if (assets) {
    res.json(asset);
  } else {
    res.status(404);
    throw Error('Asset Not Found!');
  }
});

export {
  getAssets,
  getAssetsByLink,
  deleteAsset,
  createAsset,
  updateAsset,
  getTopAssets,
};
