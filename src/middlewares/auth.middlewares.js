import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try{
        const { authorization } = req.headers;

        if (!authorization) {
            return res.send(401);
        }

        const parts = authorization.split(" ");
        const [schema, token] = parts;

        if (parts.length !== 2 || schema !== 'Bearer'){
            return res.sendStatus(401);
        }

        jwt.verify(token, process.env.SECRET_JWT, (error, decoded) => {
            if (error) {
                console.log(error);
                return res.status(401).send({message: "Error validating token."});
            }
            console.log(decoded);
            
            //id do usuario
            req.params.id = decoded.id;
            next();
        });
    } catch (err) {
        console.log(err).send({message: error.message});
        return res.status(500);
    }
}
