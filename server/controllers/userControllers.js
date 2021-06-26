import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/***
@desc Find the user as per the given email and password
@route POST /api/users/login
@access Public
**/
export const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send({
      Error: "Error occured",
    });
  }
});

/***
@desc Register a new user
@route POST /api/users/register
@access Public
**/

export const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyExsist = await User.findOne({ email: email });

  if (userAlreadyExsist) {
    res.status(400).send({
      Error: "User Already Exsist",
    });
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400).send({
      Error: "Invalid user information",
    });
  }
});

/***
@desc return user profile
@route GET /api/users/profile
@access Private
**/
export const getUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.send(user);
});

export const updateUser = AsyncHandler(async (req, res) => {
  let user = await User.findById(req.body._id);

  // console.log(req.body._id, user);

  if (user) {
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;

    const updatedUserDetails = await user.save();

    res.status(201).send({
      _id: updatedUserDetails._id,
      name: updatedUserDetails.name,
      email: updatedUserDetails.email,
      isAdmin: updatedUserDetails.isAdmin,
      token: generateToken(updatedUserDetails._id),
    });
  } else {
    res.status(401).send({
      Error: "Invalid user",
    });
  }
});
