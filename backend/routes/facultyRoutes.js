const express = require("express");
const { getFacultyDashboard } = require("../controllers/facultyController");
const { protect, isFacultyOrAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Faculty Dashboard
router.get("/dashboard", protect, isFacultyOrAdmin, getFacultyDashboard);

module.exports = router;
