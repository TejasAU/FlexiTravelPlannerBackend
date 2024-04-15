const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
  
      photo: {
        type: String,
      },
  
      role: {
        type: String,
        default: "user",
      },
    },
    { timestamps: true }
  );

// Create and export the User model
module.exports = mongoose.model('User', userSchema);