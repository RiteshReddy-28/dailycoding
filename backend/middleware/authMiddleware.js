const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================== PROTECT (verify token) ==================
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ msg: "User not found" });
    }

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// ================== ROLE CHECKS ==================
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ msg: "Access denied. Admins only." });
};

const isFacultyOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "faculty" || req.user.role === "admin")) {
    return next();
  }
  return res.status(403).json({ msg: "Access denied. Faculty or Admin only." });
};

// ================== EXPORT ==================
module.exports = {
  protect,
  isAdmin,
  isFacultyOrAdmin,
};
