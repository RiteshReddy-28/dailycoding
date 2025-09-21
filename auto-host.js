#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Auto Hosting Setup for Daily Coding Platform');
console.log('================================================');

// Check if we're in the right directory
if (!fs.existsSync('backend/package.json')) {
    console.error('❌ Please run this script from the Daily_coding root directory');
    process.exit(1);
}

console.log('📋 Setting up automated hosting...\n');

// Step 1: Check Git repository
try {
    execSync('git status', { stdio: 'ignore' });
    console.log('✅ Git repository detected');
} catch (error) {
    console.log('🔧 Initializing Git repository...');
    execSync('git init');
    execSync('git add .');
    execSync('git commit -m "Initial commit"');
    console.log('✅ Git repository created');
}

// Step 2: Railway setup
console.log('\n🚂 Setting up Railway deployment...');
console.log('1. Go to https://railway.app');
console.log('2. Sign up with GitHub');
console.log('3. Click "New Project" → "Deploy from GitHub repo"');
console.log('4. Select this repository');
console.log('5. Add these environment variables:');
console.log('   MONGO_URI=your_mongodb_atlas_connection_string');
console.log('   JWT_SECRET=your_secure_jwt_secret');
console.log('   NODE_ENV=production');

// Step 3: Netlify setup
console.log('\n🌐 Setting up Netlify deployment...');
console.log('1. Go to https://netlify.com');
console.log('2. Sign up with GitHub');
console.log('3. Click "New site from Git"');
console.log('4. Select this repository');
console.log('5. Set publish directory to: frontend');
console.log('6. Deploy!');

// Step 4: GitHub Actions setup
if (fs.existsSync('.github/workflows/deploy.yml')) {
    console.log('\n🔧 GitHub Actions configured!');
    console.log('To enable automatic deployments:');
    console.log('1. Get Railway token from https://railway.app/account/tokens');
    console.log('2. Add secrets in GitHub: Settings → Secrets and variables → Actions');
    console.log('   - RAILWAY_TOKEN');
    console.log('   - RAILWAY_SERVICE');
    console.log('   - NETLIFY_AUTH_TOKEN');
    console.log('   - NETLIFY_SITE_ID');
}

// Step 5: Create MongoDB Atlas connection
console.log('\n📚 MongoDB Atlas Setup:');
console.log('1. Go to https://cloud.mongodb.com');
console.log('2. Create free M0 cluster');
console.log('3. Create database user');
console.log('4. Whitelist all IPs (0.0.0.0/0)');
console.log('5. Get connection string and add to Railway environment');

console.log('\n🎉 Auto hosting setup complete!');
console.log('📖 See HOSTING_GUIDE.md for detailed instructions');
console.log('\n💡 Next steps:');
console.log('1. Push code to GitHub: git push origin main');
console.log('2. Deploy backend to Railway');
console.log('3. Deploy frontend to Netlify');
console.log('4. Update frontend API URLs');

// Create a quick reference file
const quickRef = `# Quick Hosting Reference

## 🚀 Auto Deploy URLs
- **Backend**: https://your-app-name.railway.app
- **Frontend**: https://your-site-name.netlify.app
- **Database**: MongoDB Atlas (cloud)

## 🔧 Required Environment Variables (Railway)
\`\`\`
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dailyCoding
JWT_SECRET=your_secure_secret_32_chars_minimum
NODE_ENV=production
CLIENT_URL=https://your-site-name.netlify.app
\`\`\`

## 📱 Quick Commands
\`\`\`bash
# Push to deploy
git add .
git commit -m "Deploy updates"
git push origin main

# Local development
cd backend && npm run dev
\`\`\`

## 🔗 Platform Links
- Railway: https://railway.app
- Netlify: https://netlify.com  
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub Actions: https://github.com/your-username/your-repo/actions
`;

fs.writeFileSync('QUICK_DEPLOY_REFERENCE.md', quickRef);
console.log('📝 Created QUICK_DEPLOY_REFERENCE.md');