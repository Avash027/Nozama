import AsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

/***
@desc Place orders 
@route POST /api/orders
@access Private
**/
export const placeOrders = AsyncHandler(async (req, res) => {
  const { orderItem } = req.body;

  try {
    const orderData = await Order.create(orderItem);

    res.status(201).send(orderData);
  } catch (error) {
    res.status(401).send({
      Error: "Invalid error or server side error",
    });
  }
});

/***
@desc Get past orders orders 
@route GET /api/orders
@access Private
**/

export const getOrders = AsyncHandler(async (req, res) => {
  let OrdersSummaries;
  if (req.user.isAdmin) OrdersSummaries = await Order.find({});
  else OrdersSummaries = await Order.find({ user: req.user._id });

  res.status(201).send(OrdersSummaries);
});

export const updateOrderStatus = AsyncHandler(async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      res.status(401).send({
        Error: "Not Authorized",
      });
    }

    const { _id, deliveryTime } = req.body;

    let order = await Order.findById(_id);

    order.isDelivered = true;
    order.deliveredAt = deliveryTime;

    const updatedOrder = await order.save();

    res.status(201).send(updatedOrder);
  } catch (error) {
    res.status(500).send({ Error: "Server Error" });
  }
});
