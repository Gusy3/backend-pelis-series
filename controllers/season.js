'use strict'

import Season from "../models/season.js";
import Serie from "../models/serie.js";
import Chapter from "../models/chapter.js";
import validator from "validator";

var controller = {

    // Guarda la temporada de una serie
    save: (request, response)=>{

        // Recoger el id de la url
        var serieId = request.params.id;

        // Buscar la serie
        Serie.findById(serieId).exec((error, serie)=> {

            if (error || !serie){

                return response.status(404).send({

                    status: "error",
                    message: "No hay serie para mostrar"
        
                });

            }
            
            // Recoger parámetros por POST
            var params = request.body;

            // Validar datos (validator)
            try{

                var validator_title = !validator.isEmpty(params.title);
                var validator_viewed = !validator.isEmpty(params.viewed);

            }catch(error){

                return response.status(404).send({

                    status: "error",
                    message: "Faltan datos"
        
                });

            }

            if (validator_title && validator_viewed){

                // Crear el objeto a guardar
                var season = new Season();

                // Asignar los valores
                season.title = params.title;
                season.viewed = params.viewed;
                season.id_serie = serie._id;

                // Guardar la temporada
                season.save((error, seasonStored)=>{

                    if(error || !seasonStored){

                        return response.status(404).send({

                            status: "error",
                            message: "¡¡La temporada no se ha guardado!!"
                
                        });

                    }

                    // Devolver una respuesta
                    return response.status(200).send({

                        status: "success",
                        season: seasonStored

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

    // Devuelve todas las temporadas de una serie
    getSeasons: (request, response)=>{

        // Recoger el id de la url
        var serieId = request.params.id;

        // Buscar la serie
        Serie.findById(serieId).exec((error, serie)=> {

            if (error || !serie){

                return response.status(404).send({

                    status: "error",
                    message: "No hay serie para mostrar"

                });

            }
            
            // Find
            Season.find({id_serie: serieId}).sort('title').collation({locale: "en", numericOrdering: true}).exec((error, seasons)=> {

                if(error){

                    return response.status(500).send({

                        status: "error",
                        message: "Error al devolver las temporadas de la serie"
            
                    });

                }

                if (!seasons){

                    return response.status(404).send({

                        status: "error",
                        message: "La serie no tiene temporadas"
            
                    });

                }
                
                return response.status(200).send({

                    status: "success",
                    seasons: seasons
        
                });

            });

        });


    },

    //Devuelve una temporada
    getSeason: (request, response)=>{

        // Recoger el id de la url
        var seasonId = request.params.id;

        // Comprobar que existe la id
        if(!seasonId || seasonId===null || seasonId===undefined){

            return response.status(404).send({

                status: "error",
                message: "No existe la temporada"
    
            });

        }

        // Buscar la temporada
        Season.findById(seasonId).exec((error, season)=> {

            if (error || !season){

                return response.status(404).send({

                    status: "error",
                    message: "No hay temporada para mostrar"
        
                });

            }
            
            // Devolver el JSON de la temporada
            return response.status(200).send({

                status: "success",
                season: season
    
            });

        });


    },

    // Modifica los datos de una temporada
    update: (request, response)=>{

        // Recoger el id de la url
        var seasonId = request.params.id;
            
        // Recoger parámetros por PUT
        var params = request.body;

        // Validar datos (validator)
        try{

            var validator_title = !validator.isEmpty(params.title);
            var validator_viewed = !validator.isEmpty(params.viewed);

        }catch(error){

            return response.status(404).send({

                status: "error",
                message: "Faltan datos"
    
            });

        }

        if (validator_title && validator_viewed){

            // Buscar la temporada y actualizarla
            Season.findByIdAndUpdate({_id: seasonId}, params, {new: true}, (error, seasonUpdated)=>{

                if(error){

                    return response.status(500).send({

                        status: "error",
                        message: "¡¡Error al actualizar la temporada!!"
            
                    });

                }

                if(!seasonUpdated){

                    return response.status(404).send({

                        status: "error",
                        message: "¡¡No se ha actualizado la temporada, probablemente no exista!!"
            
                    });

                }

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    season: seasonUpdated

                });


            });

        }else{

            return response.status(404).send({

                status: "error",
                message: "Validación incorrecta"
    
            });

        }

    },

    // Borrar una temporada
    delete: (request, response)=>{

        // Recoger el id de la url
        var seasonId = request.params.id;

        // Buscar la temporada y borrarla
        Season.findByIdAndRemove({_id: seasonId}, (error, seasonDeleted)=>{

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "¡¡Error al borrar la temporada!!"
        
                });

            }

            Chapter.deleteMany({ id_season: seasonId }).exec((error, chaptersDeleted)=>{

                if(error){

                    return response.status(500).send({

                        status: "error",
                        message: "¡¡Error al borrar todos los capítulos de la temporada!!"
            
                    });

                }

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    season: seasonDeleted
    
                });

            });

        });

    }

}

export default controller;