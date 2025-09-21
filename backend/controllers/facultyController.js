const User = require("../models/User");
const Submission = require("../models/Submission");
const Question = require("../models/Question");

/**
 * Get faculty dashboard data
 */
exports.getFacultyDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalQuestions = await Question.countDocuments();
    const totalSubmissions = await Submission.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalQuestions,
        totalSubmissions,
      },
    });
  } catch (err) {
    console.error("Faculty Dashboard Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching dashboard data",
    });
  }
};

/**
 * @desc    Get all students with basic details
 * @route   GET /api/faculty/students
 * @access  Private (Faculty/Admin)
 */
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("name email");
    
    if (!students || students.length === 0) {
      return res.status(404).json({ success: false, message: "No students found" });
    }

    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (err) {
    console.error("Error fetching students:", err.message);
    res.status(500).json({ success: false, message: "Error fetching students" });
  }
};

/**
 * @desc    Get overview (submissions) for a specific student
 * @route   GET /api/faculty/students/:id
 * @access  Private (Faculty/Admin)
 */
exports.getStudentOverview = async (req, res) => {
  try {
    const { id: studentId } = req.params;

    const submissions = await Submission.find({ student: studentId })
      .populate("question", "title description") // only fetch useful fields
      .populate("student", "name email"); // optional: also return student details

    if (!submissions || submissions.length === 0) {
      return res.status(404).json({ success: false, message: "No submissions found for this student" });
    }

    res.status(200).json({ success: true, studentId, submissions });
  } catch (err) {
    console.error("Error fetching student overview:", err.message);
    res.status(500).json({ success: false, message: "Error fetching student overview" });
  }
};
