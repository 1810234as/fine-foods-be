import express from "express";
import auth from "../configs/auth.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

dotenv.config();

const router = express.Router();

router.use(auth);

router.get("/all", getProducts);
router.get("/:id", getProductById);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
