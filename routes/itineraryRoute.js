import express from 'express';

// Importing Controllers 
import {
    createItinerary,
    getAllItineraries,
    updateActivity,
    deleteActivity
} from '../controllers/itineraryController.js'

const router = express.Router();

router.route('/createItinerary').post(createItinerary); // Create a new Itinerary
router.route("/getAllItinerary").get(getAllItineraries); // Get all the itineraries
router.route('/updateActivity').get(updateActivity); // Get an Itinerary by its title
router.route('/deleteActivity').delete(deleteActivity); // Delete an Itinerary with specific Title

export default router;