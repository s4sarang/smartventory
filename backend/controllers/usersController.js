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
      userId: user._id,
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

//@desc Register user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, emailId, team, password } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists!');
  }

  const user = await User.create({ userName, emailId, password, team });

  if (user) {
    res.status(201).json({
      userId: user._id,
      userName: user.userName,
      // name: user.name;
      emailId: user.emailId,
      isAdmin: user.isAdmin,
      token: generateToken(user.userName),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Username, Email ID or Password!');
  }
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ userName: req.user.userName });

  if (user) {
    res.json({
      userId: user._id,
      userName: user.userName,
      // name: user.name;
      emailId: user.emailId,
      isAdmin: user.isAdmin,
      team: user.team,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ userName: req.user.userName });

  if (user) {
    user.userName = req.body.userName || user.userName;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      userId: user._id,
      userName: updatedUser.userName,
      // name: updatedUser.name;
      emailId: updatedUser.emailId,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser.userName),
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

//@desc Get all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error('Users not found!');
  }
});

//@desc delete a user
//@route DELETE /api/user/id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed!' });
  } else {
    res.status(404);
    throw new Error('Users not found!');
  }
});

//@desc Get user by Id
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Users not found!');
  }
});

//@desc Update user profile
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.userName = req.body.userName || user.userName;
    user.team = req.body.team || user.team;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      userName: updatedUser.userName,
      // name: updatedUser.name;
      emailId: updatedUser.emailId,
      isAdmin: updatedUser.isAdmin,
      team: updateUser.team,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

export {
  authUser,
  registerUser,
  getUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
