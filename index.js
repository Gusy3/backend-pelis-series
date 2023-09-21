'use strict'

import mongoose from 'mongoose';
import app from './app.js';
import 'dotenv/config';

const URL_CONNECT = process.env.URL_CONNECT;
const PORT = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(URL_CONNECT, {useNewUrlParser:true})
    .then(()=>{

        console.log("La conexión a la base de datos se ha realizado correctamente");

        // Crear servidor y ponerme a escuchar peticiones HTTP
        app.listen(PORT,()=>{

            console.log("Servidor corriendo en el puerto: " + PORT);

        });

    })
    .catch(error=>{

        console.log(error);

    });