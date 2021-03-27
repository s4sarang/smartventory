import asyncHandler from 'express-async-handler';
import Requests from '../models/requestsModel.js';

//@desc Create new request
//@route POST /api/requests
//@access Private
const addRequestsItems = asyncHandler(async (req, res) => {
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

    const createdRequests = await request.save();
    res.status(200).json(createdRequests);
  }
});

export { addRequestsItems };
