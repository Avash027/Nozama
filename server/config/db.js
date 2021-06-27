import mongoose from "mongoose";
import { ERROR, SUCCESS } from "../utils/chalk.js";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    SUCCESS(`MongoDB connected : ${con.connection.host}`);
  } catch (error) {
    ERROR(`Error ${error.message}`);
    process.exit(0);
  }
};

export default connectDB;
