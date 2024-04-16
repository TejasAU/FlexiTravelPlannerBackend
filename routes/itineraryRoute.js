import express from 'express';

// Importing Controllers 
import {
    createItinerary,
    getAllItineraries,
    updateActivity,
    deleteActivity,
    getItineraryById,
    createActivity
} from '../controllers/itineraryController.js'

const router = express.Router();

router.route('/createItinerary').post(createItinerary); // Create a new Itinerary
router.route("/getAllItinerary/:userId").get(getAllItineraries); // Get all the itineraries
router.route("/getItineraryById/:itineraryId").get(getItineraryById); // Get all the itineraries
router.route("/createActivity").post(createActivity);
router.route("/updateActivity").patch(updateActivity); // Get all the itineraries
router.route('/deleteActivity/:activityId').delete(deleteActivity);
export default router;