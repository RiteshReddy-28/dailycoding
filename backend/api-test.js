#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

console.log('🧪 Testing Daily Coding API Endpoints...\n');

// Test 1: Login as admin
async function testLogin() {
  console.log('1️⃣ Testing Admin Login...');
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@dailycoding.com',
      password: 'admin123'
    });

    if (response.data.success && response.data.token) {
      console.log('✅ Admin login successful');
      return response.data.token;
    } else {
      console.log('❌ Admin login failed:', response.data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Admin login error:', error.response?.data?.message || error.message);
    return null;
  }
}

// Test 2: Get admin dashboard
async function testAdminDashboard(token) {
  console.log('\n2️⃣ Testing Admin Dashboard...');
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success) {
      console.log('✅ Admin dashboard accessible');
      console.log(`   📊 Total Users: ${response.data.data.totalUsers}`);
      console.log(`   ❓ Total Questions: ${response.data.data.totalQuestions}`);
      console.log(`   📝 Total Submissions: ${response.data.data.totalSubmissions}`);
      return true;
    } else {
      console.log('❌ Admin dashboard failed:', response.data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Admin dashboard error:', error.response?.data?.message || error.message);
    return false;
  }
}

// Test 3: Get questions
async function testGetQuestions(token) {
  console.log('\n3️⃣ Testing Get Questions...');
  try {
    const response = await axios.get(`${BASE_URL}/admin/questions`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success && Array.isArray(response.data.data)) {
      console.log('✅ Questions retrieved successfully');
      console.log(`   📋 Found ${response.data.data.length} questions`);
      return true;
    } else {
      console.log('❌ Get questions failed:', response.data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Get questions error:', error.response?.data?.message || error.message);
    return false;
  }
}

// Test 4: Register a student
async function testStudentRegistration() {
  console.log('\n4️⃣ Testing Student Registration...');
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      name: 'Test Student',
      email: 'student@test.com',
      password: 'student123',
      role: 'student'
    });

    if (response.data.success) {
      console.log('✅ Student registration successful');
      return response.data.token;
    } else {
      console.log('❌ Student registration failed:', response.data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Student registration error:', error.response?.data?.message || error.message);
    return null;
  }
}

// Test 5: Student dashboard
async function testStudentDashboard(token) {
  console.log('\n5️⃣ Testing Student Dashboard...');
  try {
    const response = await axios.get(`${BASE_URL}/student/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success) {
      console.log('✅ Student dashboard accessible');
      console.log(`   👤 Student: ${response.data.data.user.name}`);
      console.log(`   📅 Today's Question: ${response.data.data.todayQuestion ? 'Available' : 'Not available'}`);
      return true;
    } else {
      console.log('❌ Student dashboard failed:', response.data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Student dashboard error:', error.response?.data?.message || error.message);
    return false;
  }
}

// Run all tests
async function runAPITests() {
  try {
    const adminToken = await testLogin();
    if (!adminToken) return;

    await testAdminDashboard(adminToken);
    await testGetQuestions(adminToken);

    const studentToken = await testStudentRegistration();
    if (studentToken) {
      await testStudentDashboard(studentToken);
    }

    console.log('\n🎉 API testing complete!');
    console.log('\n📱 Frontend URLs:');
    console.log('   🔐 Login: file:///d:/Daily_coding/frontend/login.html');
    console.log('   👨‍💼 Admin: file:///d:/Daily_coding/frontend/admin-dashboard.html');
    console.log('   👨‍🎓 Student: file:///d:/Daily_coding/frontend/student1.html');

  } catch (error) {
    console.log('❌ API testing failed:', error.message);
  }
}

runAPITests();