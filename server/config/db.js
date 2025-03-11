const mongoose = require('mongoose');

CONNECTION_STRING = "mongodb://localhost:27017/test";

const connectDB = async () => {
    try {
      await mongoose.connect(CONNECTION_STRING);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      process.exit(1); // Exit process with failure
    }
  };
  
  module.exports = connectDB;