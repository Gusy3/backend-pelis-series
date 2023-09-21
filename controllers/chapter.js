'use strict'

import Chapter from '../models/chapter.js';
import Season from "../models/season.js";
import validator from "validator";

var controller = {

    // Guarda capítulo de la temporada de una serie
    save: (request, response)=>{

        // Recoger el id de la url
        var seasonId = request.params.id;

        // Buscar la temporada
        Season.findById(seasonId).exec((error, season)=> {

            if (error || !season){

                return response.status(404).send({

                    status: "error",
                    message: "No hay temporada para mostrar"
        
                });

            }
            
            // Recoger parámetros por POST
            var params = request.body;

            // Validar datos (validator)
            try{

                var validator_title = !validator.isEmpty(params.title);
                var validator_resolution = !validator.isEmpty(params.resolution);
                var validator_codec = !validator.isEmpty(params.codec);
                var validator_size = params.size>=0;
                var validator_viewed = !validator.isEmpty(params.viewed);

            }catch(error){

                return response.status(404).send({

                    status: "error",
                    message: "Faltan datos"
        
                });

            }

            if (validator_title && validator_resolution && validator_codec && validator_size && validator_viewed){

                // Crear el objeto a guardar
                var chapter = new Chapter();

                // Asignar los valores
                chapter.title = params.title;
                chapter.resolution = params.resolution;
                chapter.codec = params.codec;
                chapter.size = params.size;
                chapter.viewed = params.viewed;
                chapter.id_season = season._id;

                // Guardar el capítulo
                chapter.save((error, chapterStored)=>{

                    if(error || !chapterStored){

                        return response.status(404).send({

                            status: "error",
                            message: "¡¡El capítulo no se ha guardado!!"
                
                        });

                    }

                    // Devolver una respuesta
                    return response.status(200).send({

                        status: "success",
                        chapter: chapterStored

                    });


                });

            }else{

                return response.status(404).send({

                    status: "error",
                    message: "Validación incorrecta"
        
                });

            }

        });

    },

    // Devuelve todos los capítulos de una temporada
    getChapters: (request, response)=>{

        // Recoger el id de la url
        var seasonId = request.params.id;

        // Buscar la temporada
        Season.findById(seasonId).exec((error, season)=> {

            if (error || !season){

                return response.status(404).send({

                    status: "error",
                    message: "No hay temporada para mostrar"

                });

            }
            
            // Find
            Chapter.find({id_season: seasonId}).sort('title').collation({locale: "en", numericOrdering: true}).exec((error, chapters)=> {

                if(error){

                    return response.status(500).send({

                        status: "error",
                        message: "Error al devolver los capítulos de la temporada"
            
                    });

                }

                if (!chapters){

                    return response.status(404).send({

                        status: "error",
                        message: "La temporada no tiene capítulos"
            
                    });

                }
                
                return response.status(200).send({

                    status: "success",
                    chapters: chapters
        
                });

            });

        });


    },

    //Devuelve un capítulo
    getChapter: (request, response)=>{

        // Recoger el id de la url
        var chapterId = request.params.id;

        // Comprobar que existe la id
        if(!chapterId || chapterId===null || chapterId===undefined){

            return response.status(404).send({

                status: "error",
                message: "No existe el capítulo"
    
            });

        }

        // Buscar la temporada
        Chapter.findById(chapterId).exec((error, chapter)=> {

            if (error || !chapter){

                return response.status(404).send({

                    status: "error",
                    message: "No hay capítulo para mostrar"
        
                });

            }
            
            // Devolver el JSON del capítulo
            return response.status(200).send({

                status: "success",
                chapter: chapter
    
            });

        });


    },

    // Modifica los datos de un capítulo
    update: (request, response)=>{

        // Recoger el id de la url
        var chapterId = request.params.id;
            
        // Recoger parámetros por PUT
        var params = request.body;

        // Validar datos (validator)
        try{

            var validator_title = !validator.isEmpty(params.title);
            var validator_resolution = !validator.isEmpty(params.resolution);
            var validator_codec = !validator.isEmpty(params.codec);
            var validator_size = params.size>=0;
            var validator_viewed = !validator.isEmpty(params.viewed);

        }catch(error){

            return response.status(404).send({

                status: "error",
                message: "Faltan datos"
    
            });

        }

        if (validator_title && validator_resolution && validator_codec && validator_size && validator_viewed){

            // Buscar el capítulo y actualizarlo
            Chapter.findByIdAndUpdate({_id: chapterId}, params, {new: true}, (error, chapterUpdated)=>{

                if(error){

                    return response.status(500).send({

                        status: "error",
                        message: "¡¡Error al actualizar el capítulo!!"
            
                    });

                }

                if(!chapterUpdated){

                    return response.status(404).send({

                        status: "error",
                        message: "¡¡No se ha actualizado el capítulo, probablemente no exista!!"
            
                    });

                }

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    chapter: chapterUpdated

                });


            });

        }else{

            return response.status(404).send({

                status: "error",
                message: "Validación incorrecta"
    
            });

        }

    },

    // Borrar un capítulo
    delete: (request, response)=>{

        // Recoger el id de la url
        var chapterId = request.params.id;

        // Buscar el capítulo y borrarlo
        Chapter.findByIdAndRemove({_id: chapterId}, (error, chapterDeleted)=>{

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "¡¡Error al borrar el capítulo!!"
        
                });

            }

            if(!chapterDeleted){

                return response.status(404).send({

                    status: "error",
                    message: "¡¡No se ha borrado el capítulo, probablemente no exista!!"
        
                });

            }

            // Devolver una respuesta
            return response.status(200).send({

                status: "success",
                chapter: chapterDeleted

            });

        });

    }

}

export default controller;