import Itinerary from '../models/itinerarySchema.js'; // Import the Itinerary model

// Controller function to create a new itinerary
export const createItinerary = async (req, res) => {
  try {
    const { User_id, isPublic, schedule } = req.body;
    const newItinerary = await Itinerary.create({ User_id, isPublic, schedule });
    res.status(201).json(newItinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to fetch all itineraries
export const getAllItineraries = async (req, res) => {
  try {
    const allItineraries = await Itinerary.find();
    res.json(allItineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update an activity within an itinerary
export const updateActivity = async (req, res) => {
  const { itineraryId, activityId } = req.params;
  const { timeslot, title, category, address, notes } = req.body;
  try {
    const updatedItinerary = await Itinerary.findOneAndUpdate(
      { _id: itineraryId, 'schedule.activities._id': activityId }, // Match itinerary ID and activity ID
      { 
        $set: {
          'schedule.$.activities.$[activity].timeslot': timeslot,
          'schedule.$.activities.$[activity].title': title,
          'schedule.$.activities.$[activity].category': category,
          'schedule.$.activities.$[activity].address': address,
          'schedule.$.activities.$[activity].notes': notes,
        },
      },
      { 
        new: true, 
        arrayFilters: [{ 'activity._id': activityId }] 
      }
    );
    if (!updatedItinerary) {
      return res.status(404).json({ error: 'Itinerary or activity not found' });
    }
    res.json(updatedItinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to delete an activity within an itinerary
export const deleteActivity = async (req, res) => {
  const { itineraryId, activityId } = req.params;
  try {
    const updatedItinerary = await Itinerary.findOneAndUpdate(
      { _id: itineraryId },
      { $pull: { 'schedule.$[scheduleItem].activities': { _id: activityId } } },
      { new: true, arrayFilters: [{ 'scheduleItem.activities._id': activityId }] }
    );
    if (!updatedItinerary) {
      return res.status(404).json({ error: 'Itinerary or activity not found' });
    }
    res.json(updatedItinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the updated controller functions
export default { createItinerary, getAllItineraries, updateActivity, deleteActivity };

  
