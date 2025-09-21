# Database Setup Guide - MongoDB Atlas

## 🚀 Quick Setup for Free MongoDB Hosting

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project (name it "Daily Coding")

### Step 2: Create Free Cluster
1. Click "Build a Database"
2. Choose **FREE** (M0 Sandbox - 512MB storage)
3. Choose your preferred cloud provider (AWS recommended)
4. Select a region close to you
5. Name your cluster (e.g., "daily-coding-cluster")
6. Click "Create Cluster"

### Step 3: Configure Database Access
1. **Create Database User:**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `daily_coding_user`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Network Access:**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

### Step 4: Get Connection String
1. Go to "Databases" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://daily_coding_user:<password>@daily-coding-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Configure Your App
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file with your actual values:
   ```env
   MONGO_URI=mongodb+srv://daily_coding_user:YOUR_PASSWORD@daily-coding-cluster.xxxxx.mongodb.net/dailyCoding?retryWrites=true&w=majority
   JWT_SECRET=your_super_secure_jwt_secret_key_here_make_it_at_least_32_characters
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

### Step 6: Install Dependencies & Seed Database
```bash
# Install dependencies
npm install

# Seed the database with initial data
npm run seed

# Start development server
npm run dev
```

## 🌐 Deployment Options

### Option 1: Railway (Recommended - Easy & Free)
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables in Railway dashboard
6. Deploy automatically happens!

### Option 2: Render
1. Go to [Render](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables
8. Deploy!

### Option 3: Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Import your project
4. Vercel will auto-detect Node.js
5. Add environment variables in project settings
6. Deploy!

## 📊 Database Features

### Free Tier Limits:
- **Storage:** 512MB
- **RAM:** Shared
- **Connections:** 100 simultaneous
- **Perfect for:** Development, small projects, demos

### Included Features:
- ✅ Automatic backups
- ✅ 99.95% uptime SLA
- ✅ Global cluster replication
- ✅ Built-in security
- ✅ MongoDB Compass (GUI)
- ✅ Real-time monitoring

## 🔧 Local Development

```bash
# Start development server with auto-reload
npm run dev

# Seed database with sample data
npm run seed

# Production build
npm start
```

## 🔒 Security Best Practices

1. **Environment Variables:** Never commit `.env` file
2. **Strong Passwords:** Use complex database passwords
3. **Network Security:** Use IP whitelisting in production
4. **JWT Secret:** Use a strong, unique JWT secret
5. **CORS:** Configure proper CORS origins

## 📞 Support

If you encounter issues:
1. Check MongoDB Atlas logs in the dashboard
2. Verify network access settings
3. Ensure environment variables are correct
4. Check application logs for connection errors

Your database is now ready for easy hosting! 🎉