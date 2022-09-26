'use strict'

var mongoose= require('mongoose');
var app= require('./app');
var port= 3900;

/* A partir de la version de Mongoose 6 esta opción no es necesaria */
//mongoose.set('useFindAndModify', false);

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog',{useNewUrlParser:true}).then(()=>{

    console.log('La conexión a la base de datos se ha realizado bien!!!');

    /* Crear Servidor y ponerme a escuchar peticiones HTTP */

    app.listen(port, ()=>{
        
        console.log('Servidor corriendo en http://localhost:'+port);

    });


});