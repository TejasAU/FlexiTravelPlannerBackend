const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb+srv://yash:sem6flexi@cluster0.kdcqihi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(uri);

// Get the default connection
const db = mongoose.connection;

// Event listeners for successful connection and error
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

module.exports = db;

