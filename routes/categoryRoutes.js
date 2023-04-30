import express from "express";
import auth from "../config/auth.js";
import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";



const router = express.Router();

router.use(auth);

router.post("/create", createCategory);
router.get("/all", getCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;