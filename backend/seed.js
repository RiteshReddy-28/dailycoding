const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Question = require("./models/Question");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("📡 Connected to MongoDB");

    // Clear existing data (optional, for testing)
    await User.deleteMany({});
    await Question.deleteMany({});

    // Create Admin User
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
      name: "Super Admin",
      email: "admin@dailycoding.com",
      password: hashedPassword,
      role: "admin",
    });
    await admin.save();
    console.log("✅ Admin user created: admin@dailycoding.com | password: admin123");

    // Sample Questions
    const questions = [
      {
        title: "Reverse a String",
        description: "Write a function to reverse a given string.",
        difficulty: "easy",
        createdBy: admin._id,
        assignedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
      {
        title: "Find Prime Numbers",
        description: "Write a program to print all prime numbers up to N.",
        difficulty: "medium",
        createdBy: admin._id,
        assignedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        title: "LRU Cache",
        description: "Design and implement a data structure for Least Recently Used (LRU) cache.",
        difficulty: "hard",
        createdBy: admin._id,
        assignedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
    ];

    await Question.insertMany(questions);
    console.log("✅ Sample questions added");

    mongoose.connection.close();
    console.log("🚀 Seeding complete! Database is ready.");
  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
    mongoose.connection.close();
  }
};

seedData();
