const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Connect using the URI's database name to avoid case-mismatch errors
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  }
};

// 🔍 Connection status events
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose connected to DB");
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("⚠️ MongoDB connection error:", err.message);
});

// 🛑 Graceful shutdown - handled in main server file
// process.on("SIGINT", async () => {
//   await mongoose.connection.close();
//   console.log("🛑 MongoDB connection closed on app termination (SIGINT)");
//   process.exit(0);
// });

// process.on("SIGTERM", async () => {
//   await mongoose.connection.close();
//   console.log("🛑 MongoDB connection closed on app termination (SIGTERM)");
//   process.exit(0);
// });

module.exports = connectDB;
