const User = require('../models/userSchema'); // Import the User model

// Route handler for creating a new user
async function createUser(req, res) {
  const { name, email, password } = req.body; // Extract user-entered data from req.body

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

module.exports = createUser;
