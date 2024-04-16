import express from 'express';

// Importing Controllers 
import {
    createItinerary,
    getAllItinerariesWithStats,
    getItinerariesByUser,
    getItineraryById,
} from '../controllers/itineraryController.js'

import {
    createActivity,
    updateActivity,
    deleteActivity
} from '../controllers/activityController.js' 

const router = express.Router();

router.route('/createItinerary').post(createItinerary); // Create a new Itinerary
router.route("/getItinerariesByUser/:userId").get(getItinerariesByUser); // Get all the itineraries
router.route("/getItineraryById/:itineraryId").get(getItineraryById); // Get all the itineraries
router.route("/getAllItinerariesWithStats").get(getAllItinerariesWithStats); // Get all the itineraries

router.route("/createActivity").post(createActivity);
router.route("/updateActivity").patch(updateActivity); // Get all the itineraries
router.route('/deleteActivity/:activityId').delete(deleteActivity);
export default router;