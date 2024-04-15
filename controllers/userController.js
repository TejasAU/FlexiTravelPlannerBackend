import User from '../models/userSchema.js'; // Import the User model

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

async function getUserInfo(req, res) {
  try {   
      const { email, password } = req.body;
      const user = await User.findOne({
          $and: [
              { email: email },
              { password: password },
          ]
      });
      if(user) 
          return res.status(200).json( { userId: user._id, name: user.name } ) ;
      else
          return res.status(500).json( {message: 'User not found'} )
      
  } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: error.message })  
  }
};

export { 
  createUser,
  getUserInfo
};
