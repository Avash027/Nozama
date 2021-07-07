import express from "express";
import redis from "redis";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { SUCCESS } from "./utils/chalk.js";
import path from "path";

dotenv.config();

connectDB();
const PORT = process.env.PORT || 8000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const cache = (req, res, next) => {
  client.get("name", (err, data) => {
    if (!data) next();
    data += "aaa";
    res.status(201).json({ data });
  });
};

app.get("/api/redis/:name", cache, (req, res) => {
  const { name } = req.params;
  client.set("name", name);
  res.status(200).json({ name });
});

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

app.listen(
  PORT,
  SUCCESS(
    `Sever Running in ${process.env.NODE_ENV} mode in ${process.env.PORT}`
  )
);
