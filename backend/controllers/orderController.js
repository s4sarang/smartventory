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

//@desc Get order by ID
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Requests.findOne({ _id: req.params.id });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

//@desc Update order to paid
//@route GET /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Requests.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

//@desc Get logged in user order
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Requests.find({ user: req.user.userName });

  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
