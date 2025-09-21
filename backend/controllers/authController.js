const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Login user (all roles)
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment variables");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "✅ Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.stack || err.message);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

/**
 * Admin-only: create new user
 */
exports.adminCreateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Double-check admin role (middleware already restricts, but extra safe)
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and role are required",
      });
    }

    // Restrict role values
    const allowedRoles = ["student", "faculty", "admin"];
    if (!allowedRoles.includes(role.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'student', 'faculty', or 'admin'",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: role.toLowerCase(),
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "✅ User created successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Admin Create Error:", err.stack || err.message);
    res.status(500).json({
      success: false,
      message: "Server error during user creation",
    });
  }
};

/**
 * Register user (public registration)
 */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role = "student" } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create user (mongoose pre-save hook will hash password)
    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err.stack || err.message);
    try { process.stdout.write('\n--REG-ERR-STACK--\n' + (err.stack || err.message) + '\n--END-REG-ERR--\n'); } catch(e){}
    try {
      const fs = require('fs');
      fs.appendFileSync(require('path').join(__dirname, '..', 'reg-errors.log'), (new Date()).toISOString() + ' - ' + (err.stack || err.message) + '\n\n');
    } catch (e) { }
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: err.message,
    });
  }
};

/**
 * Get current user profile
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("Get Profile Error:", err.stack || err.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching profile",
    });
  }
};
