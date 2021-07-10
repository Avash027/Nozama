import express from "express";
import {
  placeOrders,
  getOrders,
  updateOrderStatus,
  getKey,
} from "../controllers/orderControllers.js";
import validator from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", validator, placeOrders);
router.get("/", validator, getOrders);
router.put("/", validator, updateOrderStatus);
router.get("/key", getKey);

export default router;
