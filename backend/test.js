#!/usr/bin/env node

const mongoose = require('mongoose');
require('dotenv').config();

console.log('🧪 Testing Daily Coding Platform...\n');

// Test 1: Database Connection
async function testDatabase() {
  console.log('1️⃣ Testing Database Connection...');
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    return false;
  }
}

// Test 2: Models
async function testModels() {
  console.log('\n2️⃣ Testing Models...');
  try {
    const User = require('./models/User');
    const Question = require('./models/Question');
    const Submission = require('./models/Submission');

    console.log('✅ Models loaded successfully');
    return true;
  } catch (error) {
    console.log('❌ Model loading failed:', error.message);
    return false;
  }
}

// Test 3: Controllers
async function testControllers() {
  console.log('\n3️⃣ Testing Controllers...');
  try {
    const authController = require('./controllers/authController');
    const studentController = require('./controllers/studentController');
    const adminController = require('./controllers/adminController');
    const facultyController = require('./controllers/facultyController');

    // Check if required functions exist
    const requiredAuth = ['loginUser', 'registerUser', 'getMe'];
    const requiredStudent = ['getDashboard', 'getTodayQuestion', 'submitAnswer', 'getSubmissions'];
    const requiredAdmin = ['getAdminDashboard', 'getQuestions'];
    const requiredFaculty = ['getFacultyDashboard', 'getStudents'];

    let allGood = true;

    requiredAuth.forEach(func => {
      if (!authController[func]) {
        console.log(`❌ Missing authController.${func}`);
        allGood = false;
      }
    });

    requiredStudent.forEach(func => {
      if (!studentController[func]) {
        console.log(`❌ Missing studentController.${func}`);
        allGood = false;
      }
    });

    requiredAdmin.forEach(func => {
      if (!adminController[func]) {
        console.log(`❌ Missing adminController.${func}`);
        allGood = false;
      }
    });

    requiredFaculty.forEach(func => {
      if (!facultyController[func]) {
        console.log(`❌ Missing facultyController.${func}`);
        allGood = false;
      }
    });

    if (allGood) {
      console.log('✅ All controller functions found');
    }
    return allGood;
  } catch (error) {
    console.log('❌ Controller testing failed:', error.message);
    return false;
  }
}

// Test 4: Routes
async function testRoutes() {
  console.log('\n4️⃣ Testing Routes...');
  try {
    const authRoutes = require('./routes/authRoutes');
    const studentRoutes = require('./routes/studentRoutes');
    const adminRoutes = require('./routes/adminRoutes');
    const facultyRoutes = require('./routes/facultyRoutes');

    console.log('✅ Routes loaded successfully');
    return true;
  } catch (error) {
    console.log('❌ Route loading failed:', error.message);
    return false;
  }
}

// Test 5: Environment Variables
function testEnvironment() {
  console.log('\n5️⃣ Testing Environment Variables...');
  const required = ['MONGO_URI', 'JWT_SECRET', 'NODE_ENV'];
  let allGood = true;

  required.forEach(env => {
    if (!process.env[env]) {
      console.log(`❌ Missing environment variable: ${env}`);
      allGood = false;
    }
  });

  if (allGood) {
    console.log('✅ All required environment variables found');
  }
  return allGood;
}

// Run all tests
async function runTests() {
  const results = await Promise.all([
    testEnvironment(),
    testDatabase(),
    testModels(),
    testControllers(),
    testRoutes()
  ]);

  const passed = results.filter(Boolean).length;
  const total = results.length;

  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);

  if (passed === total) {
    console.log('🎉 All tests passed! Your backend is ready.');
    console.log('\n🚀 Next steps:');
    console.log('1. Run: npm run seed (to add sample data)');
    console.log('2. Run: npm start (to start the server)');
    console.log('3. Test API endpoints at http://localhost:5000');
  } else {
    console.log('❌ Some tests failed. Please fix the issues above.');
  }

  await mongoose.connection.close();
  process.exit(passed === total ? 0 : 1);
}

runTests().catch(console.error);