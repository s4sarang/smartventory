import asyncHandler from 'express-async-handler';
import Requests from '../models/requestsModel.js';

//@desc Create new order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    requestsItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  } = req.body;

  if (requestsItems && requestsItems.length === 0) {
    res.status(400);
    throw new Error('No requests items');
    return;
  } else {
    const request = new Requests({
      requestsItems,
      user: req.user.userName,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrders = await request.save();
    res.status(201).json(createdOrders);
  }
});

export { addOrderItems };
