// createStudents.js
const mongoose = require("mongoose");
const User = require("./User"); // ✅ ensure correct path

// Connect to MongoDB (⚡ cleaned up options for Mongoose v6+)
mongoose.connect("mongodb://localhost:27017/dailyCoding")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Generate 50 students automatically
const generateStudents = () => {
  const students = [];
  for (let i = 1; i <= 50; i++) {
    students.push({
      name: `Student ${i}`,
      email: `student${i}@gmail.com`,
      password: `password${i}`, // simple password, will be hashed automatically
      role: "student",
    });
  }
  return students;
};

const createStudents = async () => {
  try {
    const students = generateStudents();
    for (let student of students) {
      const exists = await User.findOne({ email: student.email });
      if (!exists) {
        const newUser = new User(student);
        await newUser.save();
        console.log(`Created student: ${student.name}`);
      } else {
        console.log(`Student already exists: ${student.email}`);
      }
    }
    console.log("All students processed.");
  } catch (err) {
    console.error("Error creating students:", err);
  } finally {
    mongoose.disconnect();
  }
};

createStudents();
