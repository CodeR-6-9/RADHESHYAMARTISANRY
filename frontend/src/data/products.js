// src/data/products.js

// --- CORAL BLOOM IMPORTS ---
import coral_bloom_hori from "../assets/coral_bloom_hori.JPG"; // Horizontal
import coral_bloom_cat01_1 from "../assets/coral_bloom_cat01_1.jpeg"; // Vertical (Style 1)
import coral_bloom_cat01_2 from "../assets/coral_bloom_cat01_2.jpeg"; // Vertical (Style 1)
import coral_bloom_cat02_1 from "../assets/coral_bloom_cat02_1.jpeg"; // Vertical (Style 2)
import coral_bloom_cat02_2 from "../assets/coral_bloom_cat02_2.jpeg"; // Vertical (Style 2)

// --- EARTHEN BLOOM IMPORTS ---
import earthen_bloom_hori from "../assets/earthen_bloom_hori.JPG"; // Horizontal
import earthen_bloom_cat01_1 from "../assets/earthen_bloom_cat01_1.jpeg"; // Vertical (Style 1)
import earthen_bloom_cat01_2 from "../assets/earthen_bloom_cat01_2.jpeg"; // Vertical (Style 1)
import earthen_bloom_cat02_1 from "../assets/earthen_bloom_cat02_1.jpeg"; // Vertical (Style 2)
import earthen_bloom_cat02_2 from "../assets/earthen_bloom_cat02_2.jpeg"; // Vertical (Style 2)

// --- ELE BLOOM IMPORTS ---
import ele_bloom_hori from "../assets/ele_bloom_hori.JPG"; // Horizontal
import ele_bloom_cat01_1 from "../assets/ele_bloom_cat01_1.jpeg"; // Vertical (Style 1)
import ele_bloom_cat01_2 from "../assets/ele_bloom_cat01_2.jpeg"; // Vertical (Style 1)
import ele_bloom_cat02_1 from "../assets/ele_bloom_cat02_1.jpeg"; // Vertical (Style 2)
import ele_bloom_cat02_2 from "../assets/ele_bloom_cat02_2.jpeg"; // Vertical (Style 2)

// --- MEOW BLOOM IMPORTS ---
import meow_bloom_hori from "../assets/meow_bloom_hori.JPG"; // Horizontal
import meow_bloom_cat01_1 from "../assets/meow_bloom_cat01_1.jpeg"; // Vertical (Style 1)
import meow_bloom_cat01_2 from "../assets/meow_bloom_cat01_2.jpeg"; // Vertical (Style 1)
import meow_bloom_cat02_1 from "../assets/meow_bloom_cat02_1.jpeg"; // Vertical (Style 2)
import meow_bloom_cat02_2 from "../assets/meow_bloom_cat02_2.jpeg"; // Vertical (Style 2)

// --- MEOW GLEAM IMPORTS ---
import meow_gleam_hori from "../assets/meow_gleam_hori.jpeg"; // Horizontal
import meow_gleam_cat01_1 from "../assets/meow_gleam_cat01_1.jpeg"; // Vertical (Style 1)
import meow_gleam_cat01_2 from "../assets/meow_gleam_cat01_2.jpeg"; // Vertical (Style 1)
import meow_gleam_cat02_1 from "../assets/meow_gleam_cat02_1.jpeg"; // Vertical (Style 2)
import meow_gleam_cat02_2 from "../assets/meow_gleam_cat02_2.jpeg"; // Vertical (Style 2)

export const products = [
  {
    id: 1,
    title: "Coral Bloom Planter",
    price: 899,
    category: "planter",
    originalPrice: 1199,
    description: `This one’s for all of us quietly figuring life out one small, green step at a time. Bring home our Coral Bloom Planter, inspired by the gentle calm of the underwater world. Hand-crafted with tiny fishes, octopus, crabs, turtles, and soft sea-grasses, it feels like a little slice of the ocean sitting peacefully in your corner. Made to make your space calmer, happier, and a little greener just like the slow, steady rhythm of waves. Because honestly, we all deserve a tiny tide of peace in our homes a mini ocean bloom that reminds us to breathe, grow, and float through life softly.`,
    image: coral_bloom_cat01_1,
    images: [coral_bloom_cat01_1, coral_bloom_cat01_2],
    styles: [
      {
        name: "Ocean Green",
        images: [coral_bloom_cat01_1, coral_bloom_cat01_2],
      },
      {
        name: "Coral Detail",
        images: [coral_bloom_cat02_1, coral_bloom_cat02_2],
      },
    ],
    reviews: { average: 4.5, count: 12 },
  },
  {
    id: 2,
    title: "Meow Gleam Planter",
    price: 899,
    category: "planter",
    originalPrice: 1199,
    description: `Crafted for the ones who love a little whimsy, the Meow Gleam Planter features an adorable cat silhouette with a gentle gleam finish that catches light beautifully. Made with the hand-detailings by our artisans, it brings a soft, magical charm to any desk, shelf, or cozy corner. Perfect for tiny plants, succulents, or as a cute décor accent it’s a little piece of joy that brightens the room instantly.`,
    image: meow_gleam_cat01_1,
    images: [meow_gleam_cat01_1, meow_gleam_cat01_2],
    styles: [
      {
        name: "Golden Glow",
        images: [meow_gleam_cat01_1, meow_gleam_cat01_2],
      },
      {
        name: "Silver Shine",
        images: [meow_gleam_cat02_1, meow_gleam_cat02_2],
      },
    ],
    reviews: { average: 4.2, count: 8 },
  },
  {
    id: 3,
    title: "Meow Bloom Planter",
    price: 899,
    category: "planter",
    originalPrice: 1199,
    description: `Handcrafted in soft pastel pink tones, the Meow Bloom Planter brings a gentle, storybook charm to any corner. The cute cat motif, surrounded by tiny florals and heart details, feels like it’s straight out of a fairytale cottage. Each pattern is carved and painted by hand, giving the planter a warm, clay-art look that instantly brightens your space.`,
    image: meow_bloom_cat01_1,
    images: [meow_bloom_cat01_1, meow_bloom_cat01_2],
    styles: [
      {
        name: "Pastel Pink",
        images: [meow_bloom_cat01_1, meow_bloom_cat01_2],
      },
      {
        name: "Cream White",
        images: [meow_bloom_cat02_1, meow_bloom_cat02_2],
      },
    ],
    reviews: { average: 4.9, count: 25 },
  },
  {
    id: 5,
    title: "Ele-Bloom Planter",
    price: 899,
    category: "planter",
    originalPrice: 1199,
    description: `A playful fusion of earth and elegance, the Ele-bloom Planter brings together the charm of a hand crafted elephant silhouette with delicate floral detailing. It holds a soft rustic finish that instantly brightens any corner. Perfect for your tiny plants, succulents, or as a statement decor peice, this planter adds a gentle, whimsical energy to your home.`,
    image: ele_bloom_cat01_1,
    images: [ele_bloom_cat01_1, ele_bloom_cat01_2],
    styles: [
      {
        name: "Rustic Grey",
        images: [ele_bloom_cat01_1, ele_bloom_cat01_2],
      },
      {
        name: "Earthen Brown",
        images: [ele_bloom_cat02_1, ele_bloom_cat02_2],
      },
    ],
    reviews: { average: 4.9, count: 25 },
  },
  {
    id: 6,
    title: "Earthen Bloom Planter",
    price: 899,
    category: "planter",
    originalPrice: 1199,
    description: `Bring home a piece of magic. the earthen bloom planter is thoughtfully handcrafted to add warmth, clam, and naturalbeauty to any space. its earthy texture, gentle finish, and timeless design instantly elevate your decor while giving your plants the perfect environment to thrive`,
    image: earthen_bloom_cat01_1,
    images: [earthen_bloom_cat01_1, earthen_bloom_cat01_2],
    styles: [
      {
        name: "Terracotta",
        images: [earthen_bloom_cat01_1, earthen_bloom_cat01_2],
      },
      {
        name: "Clay Beige",
        images: [earthen_bloom_cat02_1, earthen_bloom_cat02_2],
      },
    ],
    reviews: { average: 4.9, count: 25 },
  },
];
