import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { SUCCESS } from "./utils/chalk.js";
import path from "path";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "Production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API IS Running");
  });
}

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  SUCCESS(
    `Sever Running in ${process.env.NODE_ENV} mode in ${process.env.PORT}`
  )
);
