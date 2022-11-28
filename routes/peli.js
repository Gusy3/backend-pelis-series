'use strict'

import express from "express";
import PeliController from "../controllers/peli.js";

var router = express.Router();

router.post('/save', PeliController.save);
router.get('/films', PeliController.getFilms);
router.get('/film/:id', PeliController.getFilm);
router.put('/film/:id', PeliController.update);
router.delete('/film/:id', PeliController.delete);
router.get('/search/:search', PeliController.search);


 export default router;