const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // Added this
  description: { type: String },
  category: { type: String, required: true },

  // 1. Main Thumbnail (Shop Page)
  image: { type: String, required: true },

  // 2. Default View (Desktop + Mobile)
  images: [{ type: String }],

  // 3. Styles (Variants with their own images)
  styles: [
    {
      name: { type: String },
      images: [{ type: String }], // Always 2 images [Desktop, Mobile]
    },
  ],

  reviews: {
    average: { type: Number, default: 4.5 },
    count: { type: Number, default: 0 },
  },

  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
