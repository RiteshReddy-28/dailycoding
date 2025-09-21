const express = require("express");
const { getDashboard } = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Student Dashboard
router.get("/dashboard", protect, getDashboard);

// Today's question
router.get('/getTodayQuestion', protect, require('../controllers/studentController').getTodayQuestion);

// Get submissions
router.get('/getSubmissions', protect, require('../controllers/studentController').getSubmissions);

module.exports = router;
