import AsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

//TODO Remove old orders from the orders database

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/***
@desc Get Stripe key 
@route POST /api/key
@access Public
**/

export const getKey = AsyncHandler(async (req, res) => {
  res.status(201).json({ key: process.env.STRIPE_PUBLIC_KEY });
});

/***
@desc Place orders 
@route POST /api/orders
@access Private
**/

export const placeOrders = AsyncHandler(async (req, res) => {
  const { orderItem } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: Number(orderItem.totalPrice) * 100,
      currency: "INR",
      payment_method: orderItem.stripeID,
      confirm: true,
    });

    if (!payment) {
      res.status(500).json({ Error: "Server error" });
    }

    const orderData = await Order.create(orderItem);

    if (orderData) res.status(201).send(orderData);
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

    console.log(_id, deliveryTime);
    let order = await Order.findById(_id);

    order.isDelivered = true;
    order.deliveredAt = deliveryTime;

    const updatedOrder = await order.save();

    res.status(201).send(updatedOrder);
  } catch (error) {
    res.status(500).send({ Error: "Server Error" });
  }
});
