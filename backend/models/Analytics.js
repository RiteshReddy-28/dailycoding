const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    totalUsers: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    totalSubmissions: {
      type: Number,
      default: 0,
    },
    activeStudents: {
      type: Number,
      default: 0,
    },
    submissionsPerDay: {
      type: Number,
      default: 0,
    },
    // Optional breakdown for difficulty-based submissions
    difficultyStats: {
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// ⚡ Index to quickly fetch by date
analyticsSchema.index({ date: 1 });

module.exports = mongoose.model("Analytics", analyticsSchema);
