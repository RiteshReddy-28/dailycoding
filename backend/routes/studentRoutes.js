const express = require("express");
const { getDashboard } = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Student Dashboard
router.get("/dashboard", protect, getDashboard);

module.exports = router;
