import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { NotFound, errorHandler } from "./middleware/error.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API IS Running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

//Acts between request
//Send JSON if error is there
app.use(NotFound);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Sever Running in ${process.env.NODE_ENV} mode in ${process.env.PORT}`
  )
);
