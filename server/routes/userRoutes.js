import express from "express";
const router = express.Router();

import {
  authUser,
  getUser,
  registerUser,
  updateUser,
} from "../controllers/userControllers.js";
import validator from "../middleware/authMiddleware.js";

//  api/users
router.post("/login", authUser);
router.post("/register", registerUser);
router.get("/profile", validator, getUser);
router.put("/profile", validator, updateUser);

export default router;
