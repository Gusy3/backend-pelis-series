import jwt from "jsonwebtoken";
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

var verifyToken = (request, response, next)=>{

    const bearerHeader = request.headers.authorization;

    if(!bearerHeader){

        return response.status(403).send({

            status: "error",
            message: "Acceso no autorizado"

        });

    }

    const token = bearerHeader.split(" ")[1];

    if(token==="null"){

        return response.status(403).send({

            status: "error",
            message: "Acceso no autorizado"

        });

    }

    const payload = jwt.verify(token, SECRET_KEY);
    request.userId = payload._id;
    next();

}

export default verifyToken;
