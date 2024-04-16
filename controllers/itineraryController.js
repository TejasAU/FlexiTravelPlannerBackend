import Itinerary from "../models/itinerarySchema.js"; // Import the Itinerary model

// Controller function to create a new itinerary
export const createItinerary = async (req, res) => {
    try {
        console.log(req.body);
        const { userId, cityId, cityName, desc, isPublic, dates } = req.body;
        const initialSchedule = dates.map((date) => ({
            date,
            activities: [],
        }));
        const newItinerary = await Itinerary.create({
            userId,
            cityId,
            cityName,
            desc,
            isPublic,
            schedule: initialSchedule,
        });
        res.status(201).json({ message: newItinerary._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller function to fetch all itineraries
export const getAllItineraries = async (req, res) => {
    try {
        const { userId } = req.params;
        const userItineraries = await Itinerary.find({ userId: userId });
        res.json(userItineraries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createActivity = async (req, res) => {
    const { title, timeslot, category, address, notes, itineraryId, date } = req.body;
    try {
        const newActivity = { title, timeslot, category, address, notes };
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ error: "Itinerary not found" });
        }

        // Find the schedule item for the provided date
        const scheduleItemIndex = itinerary.schedule.findIndex((item) => item.date === date);
        if (scheduleItemIndex === -1) {
            return res.status(400).json({ error: "Invalid date for itinerary" });
        }

        // Add the new activity to the schedule item
        itinerary.schedule[scheduleItemIndex].activities.push(newActivity);
        await itinerary.save();
        res.status(201).json({ message: "Activity created successfully", activity: newActivity });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateActivity = async (req, res) => {
    const { activityId, notes } = req.body;
    try {
        const updatedItinerary = await Itinerary.findOneAndUpdate(
            { "schedule.activities._id": activityId },
            { $set: { "schedule.$[scheduleItem].activities.$[activity].notes": notes } },
            {
                new: true,
                arrayFilters: [
                    { "scheduleItem.activities._id": activityId },
                    { "activity._id": activityId }
                ]
            }
        );
        if (!updatedItinerary) {
            return res
                .status(404)
                .json({ error: "Activity not found" });
        }
        res.status(200).json(updatedItinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteActivity = async (req, res) => {
    const { activityId } = req.params;
    try {
        const updatedItinerary = await Itinerary.findOneAndUpdate(
            { "schedule.activities._id": activityId },
            {
                $pull: {
                    "schedule.$[scheduleItem].activities": { _id: activityId },
                },
            },
            {
                new: true,
                arrayFilters: [{ "scheduleItem.activities._id": activityId }],
            }
        );
        if (!updatedItinerary) {
            return res
                .status(404)
                .json({ error: "Activity not found" });
        }
        res.json(updatedItinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
    

// Controller function to fetch all itineraries
export const getItineraryById = async (req, res) => {
    try {
        const { itineraryId } = req.params;
        const itinerary = await Itinerary.findOne({
            _id: itineraryId,
        });
        if (itinerary) {
            return res.status(200).json({ message: itinerary });
        } else {
            return res.status(500).json({ message: "Itinerary not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Export the updated controller functions
export default {
    createItinerary,
    getAllItineraries,
    updateActivity,
    deleteActivity,
    getItineraryById,
    createActivity
};
