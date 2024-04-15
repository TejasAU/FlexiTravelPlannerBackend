import express from "express";

// Importing Controllers 

import { creatUser } from '../controllers/userController';

const router = express.Router();

router.route( '/users' ).post(creatUser);

export default  router;