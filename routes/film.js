'use strict'

import express from "express";
import FilmController from "../controllers/film.js";
import verifyToken from "../middleware/verify-token.js";

var film_router = express.Router();

film_router.post('/film/save', verifyToken, FilmController.save);
film_router.get('/films', verifyToken, FilmController.getFilms);
film_router.get('/film/:id', verifyToken, FilmController.getFilm);
film_router.put('/film/:id', verifyToken, FilmController.update);
film_router.delete('/film/:id', verifyToken, FilmController.delete);

 export default film_router;