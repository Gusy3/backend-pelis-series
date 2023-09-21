'use strict'

import express from "express";
import FilmsSeriesController from "../controllers/films_series.js";
import verifyToken from "../middleware/verify-token.js";

var films_series_router = express.Router();

films_series_router.get('/films-series', verifyToken, FilmsSeriesController.getFilmsSeries);
films_series_router.get('/search', verifyToken, FilmsSeriesController.search);

 export default films_series_router;