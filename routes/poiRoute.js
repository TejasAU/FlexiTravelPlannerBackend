import express from  'express';

// Importing Controllers 

import { getAllPOIs,getPOIByCityName } from '../controllers/poiController.js';

const router = express.Router();

router.route('/getAllPOIs').get(getAllPOIs); // Get all POIs
router.route('/getPOI/:Cityname').get(getPOIByCityName)   //Get POIs by City Name

export default router;

