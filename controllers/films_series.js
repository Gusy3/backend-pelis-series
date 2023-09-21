'use strict'

import Film from "../models/film.js";
import Serie from "../models/serie.js";

var controller = {

    getFilmsSeries: (request, response)=>{

        let films_series = [];

        // Find
        Film.find().sort('-title').exec((error, films)=> {

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

                films_series = films.concat(series);

                // Ordenar array por created_at
                films_series.sort(function (a, b){
      
                  if (a.created_at < b.created_at){
                    return 1;
                  }
      
                  if (a.created_at > b.created_at){
                    return -1;
                  }
      
                  return 0;
      
                });
                
                return response.status(200).send({

                    status: "success",
                    films_series: films_series
        
                });

            });


        });


    },

    search: (request, response)=>{

        let films_series = [];

        // Recoger los paramametros de busqueda
        var searchTitle = request.query.title;

        // Comprobamos si el parametro existe
        if(searchTitle){

            var query = {'title': {$regex: searchTitle, $options: 'i'}};

        }

        // Find films
        Film.find(query).collation({locale: "en", strength: 1}).sort('-created_at').exec((error, films)=> {

            if(error){

                return response.status(500).send({

                    status: "error",
                    message: "Error al devolver las peliculas",
        
                });

            }

            // Find series
            Serie.find(query).collation({locale: "en", strength: 1}).sort('-created_at').exec((error, series)=> {

                if(error){

                    return response.status(500).send({

                        status: "error",
                        message: "Error al devolver las peliculas",
            
                    });

                }

                films_series = films.concat(series);

                // Ordenar array por created_at
                films_series.sort(function (a, b){
      
                  if (a.created_at < b.created_at){
                    return 1;
                  }
      
                  if (a.created_at > b.created_at){
                    return -1;
                  }
      
                  return 0;
      
                });
                
                return response.status(200).send({

                    status: "success",
                    films_series: films_series
        
                });

            });

        });

    }

} // End controller

export default controller;