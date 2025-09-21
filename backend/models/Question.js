const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    assignedDate: {
      type: Date,
      default: Date.now, // question of the day
      unique: true, // ⚡ ensures only one question per day
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
