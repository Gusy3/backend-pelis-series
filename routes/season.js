'use strict'

import express from "express";
import SeasonController from "../controllers/season.js";
import verifyToken from "../middleware/verify-token.js";

var season_router = express.Router();

season_router.post('/serie/:id/save-season', verifyToken, SeasonController.save);
season_router.get('/serie/:id/seasons', verifyToken, SeasonController.getSeasons);
season_router.get('/season/:id', verifyToken, SeasonController.getSeason);
season_router.put('/season/:id', verifyToken, SeasonController.update);
season_router.delete('/season/:id', verifyToken, SeasonController.delete);

 export default season_router;