import express from "express";

// Importing Controllers 

import { createUser } from '../controllers/userController.js';

const router = express.Router();

router.route( '/createUser').post(createUser);

export default router;