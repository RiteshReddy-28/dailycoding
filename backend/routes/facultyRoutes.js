const express = require("express");
const { getFacultyDashboard, getStudents } = require("../controllers/facultyController");
const { protect, isFacultyOrAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Faculty Dashboard
router.get("/dashboard", protect, isFacultyOrAdmin, getFacultyDashboard);

// Get all students
router.get("/students", protect, isFacultyOrAdmin, getStudents);

module.exports = router;
