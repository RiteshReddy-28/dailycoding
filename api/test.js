const mongoose = require('mongoose');

module.exports = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    res.status(200).json({ message: "API and DB are working! v2" });
  } catch (error) {
    console.error('DB connect error:', error);
    res.status(500).json({ message: "DB connection failed", error: error.message });
  }
};