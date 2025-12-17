const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // <--- 1. IMPORT MONGOOSE
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// 1. GET ALL PRODUCTS (Public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 2. GET SINGLE PRODUCT (The Fix 🛠️)
router.get("/:id", async (req, res) => {
  try {
    // A. Check if ID is valid MongoDB format to prevent Crash
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Invalid Product ID format" });
    }

    // B. Find the product
    const product = await Product.findById(req.params.id);

    // C. Handle "Product not found" in DB
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// 3. ADD PRODUCT (Private: Admin Only)
router.post("/", auth, admin, async (req, res) => {
  try {
    const { title, price, image, category, description, styles } = req.body;

    const newProduct = new Product({
      title,
      price,
      image,
      category,
      description,
      styles,
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// 4. DELETE PRODUCT (Private: Admin Only)
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    // Check ID validity here too (optional but good practice)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: "Invalid Product ID" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
