'use strict'

import Peli from "../models/peli.js";
import validator from "validator";

var controller = {

    save: (request, response)=>{

        // Recoger parámetros por POST
        var params = request.body;

        // Validar datos (validator)
        try{

            var validator_title = !validator.isEmpty(params.title);
            var validator_gender = !validator.isEmpty(params.gender);
            var validator_year = !validator.isEmpty(params.year) && (params.year>=1000 && params.year<=9999);
            var validator_resolution = !validator.isEmpty(params.resolution);
            var validator_codec = !validator.isEmpty(params.codec);
            var validator_size = !validator.isEmpty(params.size) && params.size>=0;
            var validator_synopsis = !validator.isEmpty(params.synopsis);
            var validator_image = validateImageUrl(params.image);

        }catch(error){

            return response.status(404).send({

                status: "error",
                message: "Faltan datos",
                image: validator_image
    
            });

        }

        if (validator_title && validator_gender && validator_year && validator_resolution &&
            validator_codec && validator_size && validator_synopsis && validator_image){

            // Crear el objeto a guardar
            var peli = new Peli();

            // Asignar los valores
            peli.title = params.title;
            peli.gender = params.gender;
            peli.year = params.year;
            peli.resolution = params.resolution;
            peli.codec = params.codec;
            peli.size = params.size;
            peli.synopsis = params.synopsis;
            peli.image = params.image

            // Guardar la peli
            peli.save((error, peliStored)=>{

                if(error || !peliStored){

                    return response.status(404).send({

                        status: "error",
                        message: "¡¡La peli no se ha guardado!!"
            
                    });

                }

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    film: peliStored

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
        Peli.find().sort('-_id').exec((error, films)=> {

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
        Peli.findById(filmId).exec((error, film)=> {

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
            var validator_gender = !validator.isEmpty(params.gender);
            var validator_year = !validator.isEmpty(params.year) && (params.year>=1000 && params.year<=9999);
            var validator_resolution = !validator.isEmpty(params.resolution);
            var validator_codec = !validator.isEmpty(params.codec);
            var validator_size = !validator.isEmpty(params.size) && params.size>=0;
            var validator_synopsis = !validator.isEmpty(params.synopsis);
            var validator_image = validateImageUrl(params.image);

        }catch(error){

            return response.status(404).send({

                status: "error",
                message: "Faltan datos"
    
            });

        }

        if (validator_title && validator_gender && validator_year && validator_resolution &&
            validator_codec && validator_size && validator_synopsis && validator_image){

            // Buscar la pelicula y actualizarla
            Peli.findByIdAndUpdate({_id: filmId}, params, {new: true}, (error, filmUpdated)=>{

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
        Peli.findByIdAndRemove({_id: filmId}, (error, filmDeleted)=>{

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

    },

    search: (request, response)=>{

        // Recoger los paramametros de busqueda
        var searchTitle = request.params.search;

        // Comprobamos si el parametro existe
        if(searchTitle){

            var query = {'title': {$regex: searchTitle, $options: 'i'}};

        }

        // Find
        Peli.find(query).collation({locale: "en", strength: 1}).sort('-_id').exec((error, films)=> {

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "Error al devolver las peliculas",
        
                });

            }

            if (!films || films.length===0){

                return response.status(404).send({

                    status: "error",
                    message: "No hay peliculas que coincidan con tu busqueda",
        
                });

            }
            
            return response.status(200).send({

                status: "success",
                films: films
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