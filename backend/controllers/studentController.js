const Question = require("../models/Question");
const Submission = require("../models/Submission");

// ================== DASHBOARD ==================
exports.getDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    const submissions = await Submission.find({ student: studentId }).populate("question", "title difficulty");

    const total = submissions.length;
    const accepted = submissions.filter(s => s.status === "accepted").length;
    const rejected = submissions.filter(s => s.status === "rejected").length;
    const pending = submissions.filter(s => s.status === "pending").length;

    // Also include basic user info and today's question (fallback to latest)
    const user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    };

    // Try to fetch today's question, otherwise fallback to most recent
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Use lean() to get plain JS objects so JSON shape is consistent
    let todayQuestion = await Question.findOne({
      assignedDate: { $gte: today, $lt: tomorrow }
    }).populate('createdBy', 'name').lean();

    if (!todayQuestion) {
      todayQuestion = await Question.findOne().sort({ assignedDate: -1 }).populate('createdBy', 'name').lean();
    }

    res.status(200).json({
      success: true,
      data: {
        user,
        total,
        accepted,
        rejected,
        pending,
        submissions,
        todayQuestion
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading dashboard", error: err.message });
  }
};

// ================== TODAY'S QUESTION ==================
exports.getTodayQuestion = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Return plain objects via lean() so response structure is stable
    const question = await Question.findOne({
      assignedDate: {
        $gte: today,
        $lt: tomorrow
      }
    }).populate('createdBy', 'name').lean();

    // If no question explicitly assigned today, return latest question as fallback
    if (!question) {
      const latest = await Question.findOne().sort({ assignedDate: -1 }).populate('createdBy', 'name').lean();
      if (!latest) return res.status(404).json({ success: false, message: "No question available" });
      return res.status(200).json({ success: true, data: latest });
    }

    // Always return a consistent envelope so clients/tests can rely on the shape
    return res.status(200).json({ success: true, data: question });
  } catch (err) {
    res.status(500).json({ message: "Error fetching today's question", error: err.message });
  }
};

// ================== SUBMIT ANSWER ==================
exports.submitAnswer = async (req, res) => {
  try {
    const { code, questionId, status } = req.body;

    if (!questionId || !code) {
      return res.status(400).json({ message: "Question ID and code are required" });
    }

    const submission = new Submission({
      student: req.user.id,
      question: questionId,
      code,
      status: status || "pending", // default fallback
      submittedAt: new Date(),
    });

    await submission.save();
    res.status(201).json({ success: true, data: submission });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error submitting answer", error: err.message });
  }
};

// ================== ALL SUBMISSIONS ==================
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user.id })
      .populate("question", "title difficulty assignedDate");

    res.status(200).json({
      success: true,
      data: submissions
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error loading submissions", error: err.message });
  }
};
