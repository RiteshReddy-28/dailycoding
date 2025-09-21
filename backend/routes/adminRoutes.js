const express = require("express");
const { getAdminDashboard } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", protect, isAdmin, getAdminDashboard);

module.exports = router;
