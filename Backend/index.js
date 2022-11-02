'use strict'

import mongoose from 'mongoose';
import app from './app.js';
var port= 3900;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pelis_series', {useNewUrlParser:true})
    .then(()=>{

        console.log("La conexión a la base de datos se ha realizado correctamente");

        // Crear servidor y ponerme a escuchar peticiones HTTP
        app.listen(port,()=>{

            console.log("Servidor corriendo en http://localhost:"+port);

        });

    });