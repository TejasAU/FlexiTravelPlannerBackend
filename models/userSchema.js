import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema(
    {
      name: {
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

    },
    
  );

// Create and export the User model
export default mongoose.model('User', userSchema);
