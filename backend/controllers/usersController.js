import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@desc Authenticate user login
//@route POST /api/users/login
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
      token: generateToken(user.userName),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials!');
  }
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ userName: req.user.userName });

  if (user) {
    res.json({
      userName: user.userName,
      // name: user.name;
      emailId: user.emailId,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
export { authUser, getUser };
