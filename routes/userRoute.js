import express from "express";

// Importing Controllers 

import { createUser } from '../controllers/userController';

const router = express.Router();

router.route( '/createUser' ).post(createUser);

export default  router;