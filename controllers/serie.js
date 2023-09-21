'use strict'

import Serie from "../models/serie.js";
import Season from "../models/season.js";
import Chapter from "../models/chapter.js";
import validator from "validator";

var controller = {

    // Guarda una serie
    save: (request, response)=>{

        // Recoger parámetros por POST
        var params = request.body;

        // Validar datos (validator)
        try{

            var validator_title = !validator.isEmpty(params.title);
            var validator_gender = params.gender.length>0;
            var validator_year = params.year>=1000 && params.year<=9999;
            var validator_synopsis = !validator.isEmpty(params.synopsis);
            var validator_image = validateImageUrl(params.image);
            var validator_viewed = !validator.isEmpty(params.viewed);

        }catch(error){

            return response.status(404).send({

                status: "error",
                message: "Faltan datos"
    
            });

        }

        if (validator_title && validator_gender && validator_year &&
            validator_synopsis && validator_image && validator_viewed){

            // Crear el objeto a guardar
            var serie = new Serie();

            // Asignar los valores
            serie.title = params.title;
            serie.gender = params.gender;
            serie.year = params.year;
            serie.synopsis = params.synopsis;
            serie.image = params.image;
            serie.viewed = params.viewed;
            serie.category = 'serie';

            // Guardar la serie
            serie.save((error, serieStored)=>{

                if(error || !serieStored){

                    return response.status(404).send({

                        status: "error",
                        message: "¡¡La serie no se ha guardado!!"
            
                    });

                }

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    serie: serieStored

                });


            });

        }else{

            return response.status(404).send({

                status: "error",
                message: "Validación incorrecta"
    
            });

        }

    },

    // Devuelve todas las series
    getSeries: (request, response)=>{

        // Find
        Serie.find().sort('-created_at').exec((error, series)=> {

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "Error al devolver las series"
        
                });

            }

            if (!series){

                return response.status(404).send({

                    status: "error",
                    message: "No hay series para mostrar"
        
                });

            }
            
            return response.status(200).send({

                status: "success",
                series: series
    
            });

        });


    },

    // Devuelve una serie específica
    getSerie: (request, response)=>{

        // Recoger el id de la url
        var serieId = request.params.id;

        // Comprobar que existe la id
        if(!serieId || serieId===null || serieId===undefined){

            return response.status(404).send({

                status: "error",
                message: "No existe la serie"
    
            });

        }

        // Buscar la serie
        Serie.findById(serieId).exec((error, serie)=> {

            if (error || !serie){

                return response.status(404).send({

                    status: "error",
                    message: "No hay serie para mostrar"
        
                });

            }
            
            // Devolver el JSON de la serie
            return response.status(200).send({

                status: "success",
                serie: serie
    
            });

        });

    },

    // Modifica una serie
    update: (request, response)=>{

        // Recoger el id de la url
        var serieId = request.params.id;
            
        // Recoger parámetros por PUT
        var params = request.body;

        // Validar datos (validator)
        try{

            var validator_title = !validator.isEmpty(params.title);
            var validator_gender = params.gender.length>0;
            var validator_year = params.year>=1000 && params.year<=9999;
            var validator_synopsis = !validator.isEmpty(params.synopsis);
            var validator_image = validateImageUrl(params.image);
            var validator_viewed = !validator.isEmpty(params.viewed);

        }catch(error){

            return response.status(404).send({

                status: "error",
                message: "Faltan datos"
    
            });

        }

        if (validator_title && validator_gender && validator_year &&
            validator_synopsis && validator_image && validator_viewed){

            // Buscar la serie y actualizarla
            Serie.findByIdAndUpdate({_id: serieId}, params, {new: true}, (error, serieUpdated)=>{

                if(error){

                    return response.status(500).send({

                        status: "error",
                        message: "¡¡Error al actualizar la serie!!"
            
                    });

                }

                if(!serieUpdated){

                    return response.status(404).send({

                        status: "error",
                        message: "¡¡No se ha actualizado la serie, probablemente no exista!!"
            
                    });

                }

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    serie: serieUpdated

                });


            });

        }else{

            return response.status(404).send({

                status: "error",
                message: "Validación incorrecta"
    
            });

        }

    },

    // Borra una serie
    delete: (request, response)=>{

        // Recoger el id de la url
        var serieId = request.params.id;

        // Buscar la serie y borrarla
        Serie.findByIdAndRemove({_id: serieId}, (error, serieDeleted)=>{

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "¡¡Error al borrar la serie!!"
        
                });

            }

            if(!serieDeleted){

                return response.status(404).send({

                    status: "error",
                    message: "¡¡No se ha borrado la serie, probablemente no exista!!"
        
                });

            }

            Season.find({id_serie: serieId}).exec((error, seasons)=> {

                if(error){
    
                    return response.status(500).send({
    
                        status: "error",
                        message: "Error al devolver las temporadas"
            
                    });
    
                }

                for(let season of seasons){

                    // Buscar la temporada y borrarla
                    Season.findByIdAndRemove({_id: season._id}, error=>{

                        if(error){

                            return response.status(500).send({

                                status: "error",
                                message: "¡¡Error al borrar la temporada!!"

                            });

                        }

                        Chapter.deleteMany({ id_season: season._id }).exec(error=>{

                            if(error){

                                return response.status(500).send({

                                    status: "error",
                                    message: "¡¡Error al borrar todos los capítulos de la temporada!!"
                        
                                });

                            }

                        });

                    });

                }
    
            });

            // Devolver una respuesta
            return response.status(200).send({

                status: "success",
                serie: serieDeleted

            });

        });

    }

}


// Función que valida la url de una imagen
function validateImageUrl(imageUrl){

    var imageValidate = true;

    if(imageUrl){

        imageValidate = /^https?:\/\/.*\.(?:jpg|jpeg|gif|png)$/.test(imageUrl);

    }

    return imageValidate;

}

export default controller;