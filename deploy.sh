#!/bin/bash
# Quick deployment script for Daily Coding Platform

echo "🚀 Daily Coding Platform - Deployment Helper"
echo "============================================="

# Check if we're in the right directory
if [ ! -f "backend/package.json" ]; then
    echo "❌ Please run this script from the Daily_coding root directory"
    exit 1
fi

echo "📋 Pre-deployment checklist:"
echo "1. ✅ MongoDB Atlas cluster created"
echo "2. ✅ Database user configured"
echo "3. ✅ Network access set to 0.0.0.0/0"
echo "4. ✅ Connection string ready"
echo ""

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Creating .env file from example..."
    cp backend/.env.example backend/.env
    echo "📝 Please update backend/.env with your MongoDB Atlas connection string"
    echo "   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dailyCoding"
    exit 1
fi

echo "🔧 Testing local connection with cloud database..."
cd backend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Test database connection
echo "🔍 Testing database connection..."
node -e "
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Database connection successful!');
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ Database connection failed:', err.message);
    process.exit(1);
  });
"

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub"
    echo "2. Deploy backend to Railway: https://railway.app"
    echo "3. Deploy frontend to Netlify: https://netlify.com"
    echo ""
    echo "📖 See HOSTING_GUIDE.md for detailed instructions"
else
    echo ""
    echo "❌ Please fix database connection before deploying"
    echo "📖 Check HOSTING_GUIDE.md for setup instructions"
fi