import Itinerary from "../models/itinerarySchema.js"; 


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

// Export the updated controller functions
export default {
    updateActivity,
    deleteActivity,
    createActivity
};