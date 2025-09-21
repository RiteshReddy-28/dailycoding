const express = require("express");
const { getAdminDashboard } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", protect, isAdmin, getAdminDashboard);

// All Questions (used by tests)
router.get('/questions', protect, isAdmin, require('../controllers/adminController').getQuestions);

module.exports = router;
