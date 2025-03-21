/** @format */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        console.log("🚨 No token provided");
        return res.status(401).json({ msg: "No token provided" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded Token:", decoded);

      // Attach user to request
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.log("🚨 User not found in DB for ID:", decoded.id);
        return res.status(401).json({ msg: "User not found" });
      }

      console.log("✅ Authenticated User:", req.user);
      next();
    } catch (err) {
      console.error("🚨 JWT Verification Failed:", err.message);
      res.status(401).json({ msg: "Invalid token, authorization denied" });
    }
  } else {
    console.log("🚨 No Authorization header");
    res.status(401).json({ msg: "No token, authorization denied" });
  }
};

// Middleware to check if user is an administrator
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User has admin privileges
  } else {
    res.status(403).json({ msg: "Access denied: Admins only" });
  }
};

module.exports = { protect, admin };
