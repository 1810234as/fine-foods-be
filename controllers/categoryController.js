import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({ name });

    if (category) {
      return res.status(201).json({ success: true, data: category });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category data" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const categoryId = req.params.id;

  const category = await Category.findById(categoryId);
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }

  // Check if the new name is already in use
  const existingCategory = await Category.findOne({ name });
  if (existingCategory && existingCategory.id !== category.id) {
    return res
      .status(400)
      .json({ success: false, message: "Category name is already in use" });
  }

  category.name = name;
  category.description = description;
  await category.save();

  // Update all products connected to the category
  await Product.updateMany({ category: categoryId }, { category: category });

  res.status(200).json({ success: true, data: category });
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    await Product.deleteMany({ categoryId: category.id });
    await category.remove();

    res.json({ success: true, message: "Category removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
