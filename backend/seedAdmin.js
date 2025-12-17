const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

// ⚠️ REPLACE THIS WITH YOUR EXACT GOOGLE EMAIL
const ADMIN_EMAIL = "hridesh.mehrotra@gmail.com";

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected");

    // 1. Find your user
    const user = await User.findOne({ email: ADMIN_EMAIL });

    if (!user) {
      console.log(
        "❌ User not found! Please login via Google at least once first."
      );
      process.exit(1);
    }

    // 2. Promote to Admin
    user.role = "admin";
    await user.save();

    console.log(`🎉 SUCCESS! User '${user.name}' is now an ADMIN.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
