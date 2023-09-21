'use strict'

import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "P3l1cul4syS3r13s";

var controller = {

    // Para loguear con un usuario
    login: (request, response)=>{

        // Recoger parámetros por POST
        var username = request.body.username;
        var password = request.body.password;

        // Buscar usuario
        User.findOne({username: username}).exec((error, user)=> {

            if (error){

                return response.status(500).send({

                    status: "error",
                    message: "Error en el servidor"
        
                });

            }

            if (!user){

                return response.status(404).send({

                    status: "error",
                    message: "Ha fallado el login"
        
                });

            }

            // Comparamos la password que nos llega con la password del usuario en la base de datos
            const resultPassword = bcrypt.compareSync(password, user.password);

            if(resultPassword){

                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expiresIn});

                // Devolver una respuesta
                return response.status(200).send({

                    status: "success",
                    user: {
                        username: user.username,
                        accessToken: accessToken,
                        expiresIn: expiresIn
                    }

                });

            }else{

                return response.status(404).send({

                    status: "error",
                    message: "Ha fallado el login"
        
                });

            }

        });

    }

}

export default controller;