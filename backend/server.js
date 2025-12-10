const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto"); // 1. IMPORT CRYPTO
require("dotenv").config();

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Initialize Razorpay ---
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- Routes ---

// A. Health Check Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// B. Create Order Route
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});

// C. Verify Payment Route (NEW)
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // 1. Create the expected signature using your secret key
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  // 2. Compare signatures
  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database logic here (e.g., mark order as Paid)
    console.log("Payment Verified");

    res.json({ success: true, message: "Payment Verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid Signature" });
  }
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});
