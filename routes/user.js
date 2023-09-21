'use strict'

import express from "express";
import UserController from "../controllers/user.js";

var user_router = express.Router();

user_router.post('/login', UserController.login);

 export default user_router;