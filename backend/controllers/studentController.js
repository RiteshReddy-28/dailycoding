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

    res.status(200).json({
      success: true,
      data: {
        total,
        accepted,
        rejected,
        pending,
        submissions
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

    const question = await Question.findOne({
      assignedDate: {
        $gte: today,
        $lt: tomorrow
      }
    }).populate('createdBy', 'name');

    if (!question) {
      return res.status(404).json({ message: "No question available for today" });
    }

    res.status(200).json(question);
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
    res.status(201).json({ message: "✅ Submission saved successfully", submission });
  } catch (err) {
    res.status(500).json({ message: "Error submitting answer", error: err.message });
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
    res.status(500).json({ message: "Error loading submissions", error: err.message });
  }
};
