import jwt from "jsonwebtoken";
const SECRET_KEY = "P3l1cul4syS3r13s";

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