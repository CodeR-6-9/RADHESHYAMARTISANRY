const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  // Password is optional for Google Login users
  password: { type: String },

  // Google ID for OAuth
  googleId: { type: String },

  // --- NEW FIELD: ROLE ---
  // Default is "user". You will manually change this to "admin" later in the database.
  role: { type: String, default: "user" },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
