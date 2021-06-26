import mongoose from "mongoose";

const friendSchema = mongoose.Schema({
  friendIndexes: {
    type: Number,
  },
});

const userTestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  friends: [friendSchema],
  userIndexes: {
    type: Number,
    required: true,
  },
});

const UserTest = mongoose.model("UserTest", userTestSchema);

export default UserTest;
