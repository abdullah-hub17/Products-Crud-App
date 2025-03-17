const mongoose = require("mongoose");
require("dotenv").config();

CONNECTION_STRING = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
