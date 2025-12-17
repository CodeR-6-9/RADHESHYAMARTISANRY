const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    // 1. Get user from DB using the ID from the token
    const user = await User.findById(req.user.id);

    // 2. Check the ROLE
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }

    // 3. Allowed!
    next();
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
