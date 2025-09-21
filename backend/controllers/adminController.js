const Question = require("../models/Question");
const Analytics = require("../models/Analytics");
const User = require("../models/User");

/**
 * Get admin dashboard data
 */
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuestions = await Question.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalFaculty = await User.countDocuments({ role: "faculty" });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalQuestions,
        totalStudents,
        totalFaculty,
      },
    });
  } catch (err) {
    console.error("Admin Dashboard Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching dashboard data",
    });
  }
};

/**
 * Get all questions
 */
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: err.message,
    });
  }
};

/**
 * Add a new question
 */
exports.addQuestion = async (req, res) => {
  try {
    const { title, description, difficulty } = req.body;

    // Basic validation
    if (!title || !description || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and difficulty are required",
      });
    }

    // Restrict difficulty values
    const allowedDifficulties = ["easy", "medium", "hard"];
    if (!allowedDifficulties.includes(difficulty.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Difficulty must be 'easy', 'medium', or 'hard'",
      });
    }

    const question = new Question({
      title,
      description,
      difficulty: difficulty.toLowerCase(),
      createdBy: req.user?.id || null, // ✅ safe fallback
    });

    await question.save();
    res.status(201).json({
      success: true,
      message: "✅ Question added successfully",
      data: question,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add question",
      error: err.message,
    });
  }
};

/**
 * Update a question
 */
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, difficulty } = req.body;

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (difficulty) {
      const allowed = ["easy", "medium", "hard"];
      if (!allowed.includes(difficulty.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: "Invalid difficulty value",
        });
      }
      updateFields.difficulty = difficulty.toLowerCase();
    }

    const updated = await Question.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.status(200).json({
      success: true,
      message: "✅ Question updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update question",
      error: err.message,
    });
  }
};

/**
 * Delete a question
 */
exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.status(200).json({
      success: true,
      message: "🗑️ Question deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete question",
      error: err.message,
    });
  }
};

/**
 * Get latest analytics
 */
exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findOne().sort({ createdAt: -1 });

    if (!analytics) {
      return res.status(404).json({ success: false, message: "No analytics data available" });
    }

    res.status(200).json({ success: true, data: analytics });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
      error: err.message,
    });
  }
};
