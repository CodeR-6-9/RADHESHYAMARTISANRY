// src/data/products.js
import coral_bloom01 from "../assets/coral_bloom01.JPG";
import coral_bloom02 from "../assets/coral_bloom02.JPG";
import coral_bloom03 from "../assets/coral_bloom03.JPG";

import earthen_bloom01 from "../assets/earthen_bloom01.JPG";
import earthen_bloom02 from "../assets/earthen_bloom02.JPG";
import earthen_bloom03 from "../assets/earthen_bloom03.JPG";

import ele_bloom01 from "../assets/ele_bloom01.JPG";
import ele_bloom02 from "../assets/ele_bloom02.JPG";
import ele_bloom03 from "../assets/ele_bloom03.JPG";

import meow_bloom01 from "../assets/meow_bloom01.JPG";
import meow_bloom02 from "../assets/meow_bloom02.JPG";
import meow_bloom03 from "../assets/meow_bloom03.JPG";

import meow_gleam01 from "../assets/meow_gleam01.jpeg";
import meow_gleam02 from "../assets/meow_gleam02.jpeg";
import meow_gleam03 from "../assets/meow_gleam03.jpeg";
export const products = [
  {
    id: 1,
    title: "Coral Bloom Planter",
    price: 999,
    originalPrice: 1332,
    description: `This one’s for all of us quietly figuring life out one small, green step at a time. Bring home our Coral Bloom Planter, inspired by the gentle calm of the underwater world. Hand-crafted with tiny fishes, octopus, crabs, turtles, and soft sea-grasses, it feels like a little slice of the ocean sitting peacefully in your corner. Made to make your space calmer, happier, and a little greener just like the slow, steady rhythm of waves. Because honestly, we all deserve a tiny tide of peace in our homes a mini ocean bloom that reminds us to breathe, grow, and float through life softly.`,
    // Main image for the card
    image: coral_bloom01,
    // Gallery images for the product page
    images: [coral_bloom02, coral_bloom03],
    colors: [
      { name: "Green", hex: "#2e8b57", selected: true },
      { name: "Black", hex: "#000000", selected: false },
    ],
    sizes: ["S", "M", "L"],
    reviews: { average: 4.5, count: 12 },
  },
  {
    id: 2,
    title: "Meow Gleam Planter",
    price: 799,
    originalPrice: 1066,
    description: `Crafted for the ones who love a little whimsy, the Meow Gleam Planter features an adorable cat silhouette with a gentle gleam finish that catches light beautifully. Made with the hand-detailings by our artisans, it brings a soft, magical charm to any desk, shelf, or cozy corner. Perfect for tiny plants, succulents, or as a cute décor accent it’s a little piece of joy that brightens the room instantly.`,
    image: meow_gleam01,
    images: [meow_gleam02, meow_gleam03],
    colors: [
      { name: "Yellow", hex: "#FFD700", selected: true },
      { name: "Red", hex: "#FF0000", selected: false },
    ],
    sizes: ["M", "L", "XL"],
    reviews: { average: 4.2, count: 8 },
  },
  {
    id: 3,
    title: "Meow Bloom Planter",
    price: 999,
    originalPrice: 1332,
    description: `Handcrafted in soft pastel pink tones, the Meow Bloom Planter brings a gentle, storybook charm to any corner. The cute cat motif, surrounded by tiny florals and heart details, feels like it’s straight out of a fairytale cottage. Each pattern is carved and painted by hand, giving the planter a warm, clay-art look that instantly brightens your space.`,
    image: meow_bloom01,
    images: [meow_bloom02, meow_bloom03],
    colors: [
      { name: "Blue", hex: "#5b9bd5", selected: true },
      { name: "White", hex: "#ffffff", selected: false },
    ],
    sizes: ["S", "M", "L", "XL"],
    reviews: { average: 4.9, count: 25 },
  },
  // {
  //   id: 4,
  //   title: "Chrissy Wissy planter ",
  //   price: 999,
  //   originalPrice: 1332,
  //   description: `Step into a winter wonderland with our Chrissy Wissy Planter! This Christmas-themed beauty is sprinkled with festive charm think cute fairy tale houses, cozy Christmas gates, twinkling trees, delicate snowflakes, and a gentle touch of frost. Perfect for adding a magical, cozy vibe to any corner of your home, it’s not just a planter it’s a little piece of holiday cheer that brings the spirit of Christmas alive all season long.`,
  //   image: "https://placehold.co/400x500/png?text=Kutta",
  //   images: [
  //     "https://placehold.co/400x500/png?text=Kutta+Front",
  //     "https://placehold.co/400x500/png?text=Kutta+Side",
  //   ],
  //   colors: [
  //     { name: "Blue", hex: "#5b9bd5", selected: true },
  //     { name: "White", hex: "#ffffff", selected: false },
  //   ],
  //   sizes: ["S", "M", "L", "XL"],
  //   reviews: { average: 4.9, count: 25 },
  // },
  {
    id: 5,
    title: "Ele-Bloom Planter",
    price: 999,
    originalPrice: 1332,
    description: `A playful fusion of earth and elegance, the Ele-bloom Planter brings together the charm of a hand crafted elephant silhouette with delicate floral detailing. It holds a soft rustic finish that instantly brightens any corner. Perfect for your tiny plants, succulents, or as a statement decor peice, this planter adds a gentle, whimsical energy to your home.`,
    image: ele_bloom01,
    images: [ele_bloom02, ele_bloom03],
    colors: [
      { name: "Blue", hex: "#5b9bd5", selected: true },
      { name: "White", hex: "#ffffff", selected: false },
    ],
    sizes: ["S", "M", "L", "XL"],
    reviews: { average: 4.9, count: 25 },
  },
  {
    id: 6,
    title: "Earthen Bloom Planter",
    price: 999,
    originalPrice: 1332,
    description: `Bring home a piece of magic. the earthen bloom planter is thoughtfully handcrafted to add warmth, clam, and naturalbeauty to any space. its earthy texture, gentle finish, and timeless design instantly elevate your decor while giving your plants the perfect environment to thrive`,
    image: earthen_bloom01,
    images: [earthen_bloom02, earthen_bloom03],
    colors: [
      { name: "Blue", hex: "#5b9bd5", selected: true },
      { name: "White", hex: "#ffffff", selected: false },
    ],
    sizes: ["S", "M", "L", "XL"],
    reviews: { average: 4.9, count: 25 },
  },
];
