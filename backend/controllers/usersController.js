import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//@desc Fetch all assets
//@route GET /api/assets
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });

  if (user && (await user.matchPassword(password))) {
    res.json({
      userName: user.userName,
      // name: user.name;
      emailId: user.emailId,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials!');
  }
});

export default authUser;
