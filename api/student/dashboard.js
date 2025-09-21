const mongoose = require('mongoose');
const Question = require('../models/Question');
const Submission = require('../models/Submission');
const { protect } = require('../utils/auth');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    req = await protect(req);

    const studentId = req.user.id;

    const submissions = await Submission.find({ student: studentId }).populate("question", "title difficulty");

    const total = submissions.length;
    const accepted = submissions.filter(s => s.status === "accepted").length;
    const rejected = submissions.filter(s => s.status === "rejected").length;
    const pending = submissions.filter(s => s.status === "pending").length;

    const user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    };

    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

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
  } catch (error) {
    console.error(error);
    if (error.message.includes('authorization denied') || error.message.includes('not valid')) {
      res.status(401).json({ success: false, message: 'Not authorized' });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};