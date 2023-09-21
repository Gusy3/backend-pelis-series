'use strict'

import Film from "../models/film.js";
import validator from "validator";

var controller = {

    save: (request, response)=>{

        // Recoger parámetros por POST
        var params = request.body;

        // Validar datos (validator)
        try{

            var validator_title = !validator.isEmpty(params.title);
            var validator_version = !validator.isEmpty(params.version);
            var validator_gender = params.gender.length>0;
            var validator_year = params.year>=1000 && params.year<=9999;
            var validator_resolution = !validator.isEmpty(params.resolution);
            var validator_codec = !validator.isEmpty(params.codec);
            var validator_size = params.size>=0;
            var validator_synopsis = !validator.isEmpty(params.synopsis);
            var validator_image = validateImageUrl(params.image);
            var validator_viewed = !validator.isEmpty(params.viewed);

        }catch(error){

            return response.status(404).send({

                status: "error",
                message: "Faltan datos"
    
            });

        }

        if (validator_title && validator_version && validator_gender && validator_year && validator_resolution &&
            validator_codec && validator_size && validator_synopsis && validator_image && validator_viewed){

            // Crear el objeto a guardar
            var film = new Film();

            // Asignar los valores
            film.title = params.title;
            film.version = params.version;
            film.gender = params.gender;
            film.year = params.year;
            film.resolution = params.resolution;
            film.codec = params.codec;
            film.size = params.size;
            film.synopsis = params.synopsis;
            film.image = params.image;
            film.viewed = params.viewed;
            film.category = 'pelicula';

            // Guardar la pelicula
            film.save((error, filmStored)=>{

                if(error || !filmStored){

                    return response.status(404).send({

                        status: "error",
                        message: "¡¡La película no se ha guardado!!"
            
                    });

                }

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    film: filmStored

                });


            });

        }else{

            return response.status(404).send({

                status: "error",
                message: "Validación incorrecta"
    
            });

        }

    },

    getFilms: (request, response)=>{

        // Find
        Film.find().sort('-created_at').exec((error, films)=> {

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "Error al devolver las peliculas"
        
                });

            }

            if (!films){

                return response.status(404).send({

                    status: "error",
                    message: "No hay peliculas para mostrar"
        
                });

            }
            
            return response.status(200).send({

                status: "success",
                films: films
    
            });

        });


    },

    getFilm: (request, response)=>{

        // Recoger el id de la url
        var filmId= request.params.id;

        // Comprobar que existe la id
        if(!filmId || filmId===null || filmId===undefined){

            return response.status(404).send({

                status: "error",
                message: "No existe la pelicula"
    
            });

        }

        // Buscar la pelicula
        Film.findById(filmId).exec((error, film)=> {

            if (error || !film){

                return response.status(404).send({

                    status: "error",
                    message: "No hay pelicula para mostrar"
        
                });

            }
            
            // Devolver el JSON de la pelicula
            return response.status(200).send({

                status: "success",
                film: film
    
            });

        });

    },

    update: (request, response)=>{

        // Recoger el id de la url
        var filmId= request.params.id;
            
        // Recoger parámetros por PUT
        var params= request.body;

        // Validar datos (validator)
        try{

            var validator_title = !validator.isEmpty(params.title);
            var validator_version = !validator.isEmpty(params.version);
            var validator_gender = params.gender.length>0;
            var validator_year = params.year>=1000 && params.year<=9999;
            var validator_resolution = !validator.isEmpty(params.resolution);
            var validator_codec = !validator.isEmpty(params.codec);
            var validator_size = params.size>=0;
            var validator_synopsis = !validator.isEmpty(params.synopsis);
            var validator_image = validateImageUrl(params.image);
            var validator_viewed = !validator.isEmpty(params.viewed);

        }catch(error){

            return response.status(404).send({

                status: "error",
                message: "Faltan datos"
    
            });

        }

        if (validator_title && validator_version && validator_gender && validator_year && validator_resolution &&
            validator_codec && validator_size && validator_synopsis && validator_image && validator_viewed){

            // Buscar la pelicula y actualizarla
            Film.findByIdAndUpdate({_id: filmId}, params, {new: true}, (error, filmUpdated)=>{

                if(error){

                    return response.status(500).send({

                        status: "error",
                        message: "¡¡Error al actualizar la pelicula!!"
            
                    });

                }

                if(!filmUpdated){

                    return response.status(404).send({

                        status: "error",
                        message: "¡¡No se ha actualizado la pelicula, probablemente no exista!!"
            
                    });

                }

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    film: filmUpdated

                });


            });

        }else{

            return response.status(404).send({

                status: "error",
                message: "Validación incorrecta"
    
            });

        }

    },

    delete: (request, response)=>{

        // Recoger el id de la url
        var filmId= request.params.id;

        // Buscar la pelicula y borrarla
        Film.findByIdAndRemove({_id: filmId}, (error, filmDeleted)=>{

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "¡¡Error al borrar la pelicula!!"
        
                });

            }

            if(!filmDeleted){

                return response.status(404).send({

                    status: "error",
                    message: "¡¡No se ha borrado la pelicula, probablemente no exista!!"
        
                });

            }

            // Devolver una respuesta
            return response.status(200).send({

                status: "success",
                film: filmDeleted

            });

        });

    }

} // End controller

function validateImageUrl(imageUrl){

    var imageValidate = true;

    if(imageUrl){

        imageValidate = /^https?:\/\/.*\.(?:jpg|jpeg|gif|png)$/.test(imageUrl);

    }

    return imageValidate;

}

export default controller;