import express from "express";
const router = express.Router();

import validator from "./../middleware/authMiddleware.js";

import {
  getProducts,
  getProductByID,
  addProducts,
  addReviews,
  deleteReviews,
  updateQty,
  deleteProduct,
} from "../controllers/productControllers.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProductByID);
router.post("/add", validator, addProducts);
router.post("/delete", validator, deleteProduct);
router.post("/reviews", validator, addReviews);
router.post("/deletereviews", validator, deleteReviews);
router.post("/updateQty", validator, updateQty);

export default router;
