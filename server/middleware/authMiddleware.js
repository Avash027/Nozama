import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const validator = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

      //allows access to all the protected routes
      req.user = await User.findById(decodeToken.id).select("-password");
    } catch (error) {
      res.status(401).send("invalid token");
    }
  }

  if (!token) {
    res.status(401).send("invalid user");
  }

  next();
};

export default validator;
