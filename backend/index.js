const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*", // ✅ safer in production
  credentials: true,
}));
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev")); // ✅ logs requests in dev
}

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api", (req, res) => {
  res.json({
    status: "✅ OK",
    service: "Daily Coding API",
    environment: process.env.NODE_ENV || "development",
  });
});

// Serve the main application (login page) for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err.message);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
});

// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to connect to DB", err.message);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
const shutdown = () => {
  console.log("🛑 Server shutting down...");
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
