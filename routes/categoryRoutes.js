// create category routes with auth check
import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

dotenv.config();

const router = express.Router();

router.use(auth);

router.post("/create", createCategory);
router.get("/all", getAllCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);