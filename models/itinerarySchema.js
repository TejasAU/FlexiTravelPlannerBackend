import mongoose from 'mongoose';

// Define the schema for activities within the itinerary
const activitySchema = new mongoose.Schema({
  timeslot: {
    type: String, // You can adjust the type based on your needs (e.g., Date, Number, etc.)
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
});

// Define the main itinerary schema
const itinerarySchema = new mongoose.Schema({
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false, // Default value for isPublic is false
  },
  schedule: [
    {
      date: {
        type: Date, // Date type for the schedule date
        required: true,
      },
      activities: [activitySchema], // Embed activitySchema within schedule
    },
  ],
});

// Create the Itinerary model using the itinerarySchema
const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;
