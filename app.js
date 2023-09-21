'use strict'

// Cargar módulos de node para crear servidor
import express from 'express';
import bodyParser from 'body-parser';

// Ejecutar express (http)
var app = express();

// Cargar ficheros rutas
import all_routes from "./routes/films_series.js";
import film_routes from "./routes/film.js";
import serie_routes from "./routes/serie.js";
import season_routes from "./routes/season.js";
import chapter_routes from "./routes/chapter.js";
import user_routes from "./routes/user.js";

//MiddLewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Añadir prefijos a rutas / Cargar rutas
app.use('/api', user_routes);
app.use('/api', all_routes);
app.use('/api', film_routes);
app.use('/api', serie_routes);
app.use('/api', season_routes);
app.use('/api', chapter_routes);

// Exportar el módulo (fichero actual)
export default app;