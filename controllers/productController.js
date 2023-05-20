import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json({ success: true, data: products, message: "Продукты получены" });
});

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Продукт не найден" });
  }

  res.json({ success: true, data: product });
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
    });

    const createdProduct = await product.save();

    return res.status(201).json({
      success: true,
      data: createdProduct,
      message: 'Продукт добавлен',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Ошибка сервера',
      message: 'Ошибка сервера',
    });
  }
});


// @desc    Update a product by ID
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Продукт не найден" });
  }

  product.name = name;
  product.description = description;
  product.price = price;

  const updatedProduct = await product.save();

  res.json({ success: true, data: updatedProduct, message: "Продукт успешно обновлен" });
});

// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Продукт не найден" });
  }

  await Product.deleteOne({ _id: req.params.id });

  res.json({ success: true, message: "Продукт удалён" });
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
