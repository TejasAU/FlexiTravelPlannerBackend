import express from "express";

// Importing Controllers 

import { createUser, getUserInfo } from '../controllers/userController.js';

const router = express.Router();

router.route('/createUser').post(createUser);
router.route('/getUserInfo').post(getUserInfo);

export default router;