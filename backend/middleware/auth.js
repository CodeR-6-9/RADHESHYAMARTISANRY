const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // 1. Get token from header (Format: "Bearer <token>")
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // 2. Remove "Bearer " prefix if present
    const actualToken = token.startsWith("Bearer ")
      ? token.slice(7, token.length)
      : token;

    // 3. Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // 4. Add user to request object
    req.user = decoded; // Now we know WHO the user is
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
