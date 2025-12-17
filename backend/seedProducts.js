const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

// --- DATA: EXACTLY MATCHING YOUR LOGIC ---
const products = [
  {
    title: "Earthen Bloom Planter",
    price: 899,
    originalPrice: 1199,
    category: "planter",
    description:
      "Bring home a piece of magic. The Earthen Bloom planter is thoughtfully handcrafted to add warmth, calm, and natural beauty to any space. Its earthy texture, gentle finish, and timeless design instantly elevate your decor.",

    // 1. Thumbnail
    image: "/assets/earthen_bloom_cat01_1.jpeg",

    // 2. Default View [Desktop, Mobile]
    images: [
      "/assets/earthen_bloom_cat01_1.jpeg",
      "/assets/earthen_bloom_cat01_2.jpeg",
    ],

    inStock: true,

    // 3. Styles (Name + [Desktop, Mobile])
    styles: [
      {
        name: "Terracotta",
        images: [
          "/assets/earthen_bloom_cat01_1.jpeg",
          "/assets/earthen_bloom_cat01_2.jpeg",
        ],
      },
      {
        name: "Clay Beige",
        images: [
          "/assets/earthen_bloom_cat02_1.jpeg",
          "/assets/earthen_bloom_cat02_2.jpeg",
        ],
      },
    ],
    reviews: { average: 4.9, count: 25 },
  },
  {
    title: "Coral Bloom Planter",
    price: 899,
    originalPrice: 1199,
    category: "planter",
    description:
      "Inspired by the gentle calm of the underwater world. Hand-crafted with tiny fishes, octopus, crabs, turtles, and soft sea-grasses.",
    image: "/assets/coral_bloom_cat01_1.jpeg",
    images: [
      "/assets/coral_bloom_cat01_1.jpeg",
      "/assets/coral_bloom_cat01_2.jpeg",
    ],
    inStock: true,
    styles: [
      {
        name: "Ocean Green",
        images: [
          "/assets/coral_bloom_cat01_1.jpeg",
          "/assets/coral_bloom_cat01_2.jpeg",
        ],
      },
      {
        name: "Coral Detail",
        images: [
          "/assets/coral_bloom_cat02_1.jpeg",
          "/assets/coral_bloom_cat02_2.jpeg",
        ],
      },
    ],
    reviews: { average: 4.5, count: 12 },
  },
  {
    title: "Meow Gleam Planter",
    price: 899,
    originalPrice: 1199,
    category: "planter",
    description:
      "Features an adorable cat silhouette with a gentle gleam finish that catches light beautifully.",
    image: "/assets/meow_gleam_cat01_1.jpeg",
    images: [
      "/assets/meow_gleam_cat01_1.jpeg",
      "/assets/meow_gleam_cat01_2.jpeg",
    ],
    inStock: true,
    styles: [
      {
        name: "Golden Glow",
        images: [
          "/assets/meow_gleam_cat01_1.jpeg",
          "/assets/meow_gleam_cat01_2.jpeg",
        ],
      },
      {
        name: "Silver Shine",
        images: [
          "/assets/meow_gleam_cat02_1.jpeg",
          "/assets/meow_gleam_cat02_2.jpeg",
        ],
      },
    ],
    reviews: { average: 4.2, count: 8 },
  },
  {
    title: "Meow Bloom Planter",
    price: 899,
    originalPrice: 1199,
    category: "planter",
    description:
      "Handcrafted in soft pastel pink tones, brings a gentle, storybook charm to any corner.",
    image: "/assets/meow_bloom_cat01_1.jpeg",
    images: [
      "/assets/meow_bloom_cat01_1.jpeg",
      "/assets/meow_bloom_cat01_2.jpeg",
    ],
    inStock: true,
    styles: [
      {
        name: "Pastel Pink",
        images: [
          "/assets/meow_bloom_cat01_1.jpeg",
          "/assets/meow_bloom_cat01_2.jpeg",
        ],
      },
      {
        name: "Cream White",
        images: [
          "/assets/meow_bloom_cat02_1.jpeg",
          "/assets/meow_bloom_cat02_2.jpeg",
        ],
      },
    ],
    reviews: { average: 4.9, count: 25 },
  },
  {
    title: "Ele-Bloom Planter",
    price: 899,
    originalPrice: 1199,
    category: "planter",
    description:
      "A playful fusion of earth and elegance, bringing together the charm of a handcrafted elephant silhouette.",
    image: "/assets/ele_bloom_cat01_1.jpeg",
    images: [
      "/assets/ele_bloom_cat01_1.jpeg",
      "/assets/ele_bloom_cat01_2.jpeg",
    ],
    inStock: true,
    styles: [
      {
        name: "Rustic Grey",
        images: [
          "/assets/ele_bloom_cat01_1.jpeg",
          "/assets/ele_bloom_cat01_2.jpeg",
        ],
      },
      {
        name: "Earthen Brown",
        images: [
          "/assets/ele_bloom_cat02_1.jpeg",
          "/assets/ele_bloom_cat02_2.jpeg",
        ],
      },
    ],
    reviews: { average: 4.9, count: 25 },
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected");
    await Product.deleteMany({});
    console.log("🧹 Old products cleared...");
    await Product.insertMany(products);
    console.log("🎉 Products with correct Structure Added!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
