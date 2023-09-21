'use strict'

import express from "express";
import SerieController from "../controllers/serie.js";
import verifyToken from "../middleware/verify-token.js";

var router = express.Router();

router.post('/serie/save', verifyToken, SerieController.save);
router.get('/series', verifyToken, SerieController.getSeries);
router.get('/serie/:id', verifyToken, SerieController.getSerie);
router.put('/serie/:id', verifyToken, SerieController.update);
router.delete('/serie/:id', verifyToken, SerieController.delete);

 export default router;