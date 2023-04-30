import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8080;
const app = express();

const logger = (req, res, next) => {
  next();
};

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
