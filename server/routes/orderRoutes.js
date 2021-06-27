import express from "express";
import {
  placeOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderControllers.js";
import validator from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", validator, placeOrders);
router.get("/", validator, getOrders);
router.put("/", validator, updateOrderStatus);

export default router;
