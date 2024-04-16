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
export const getItinerariesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const userItineraries = await Itinerary.find({ userId: userId });
        res.json(userItineraries);
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

export const getAllItinerariesWithStats = async (req, res) => {
    try {
        const itineraries = await Itinerary.find().populate('userId', 'name');
        const itinerariesWithStats = itineraries.map((itinerary) => {
            const { _id, cityName, desc, schedule, userId } = itinerary;
            const durationOfTrip = schedule.length;
            const numberOfPlacesAdded = schedule.reduce((acc, curr) => acc + curr.activities.length, 0);
            const userName = userId.name;
            return {
                _id,
                cityName,
                desc,
                durationOfTrip,
                numberOfPlacesAdded,
                userName,
            };
        });
        res.json(itinerariesWithStats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export the updated controller functions
export default {
    createItinerary,
    getItinerariesByUser,
    getItineraryById,
    getAllItinerariesWithStats
};
