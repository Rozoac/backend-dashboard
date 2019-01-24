import jwt from "jsonwebtoken";
import {SEED} from "../config/config";


// =============================
// VERIFICAR EL TOKEN
// =============================
export const verificaToken =  (req:any, res:any, next:any) => {
      var token = req.query.token;
      jwt.verify(token, SEED, (err:any, decoded:any) => {
        if (err) {
          return res
            .status(401)
            .json({
              ok: false,
              mensaje: "Token incorrecto",
              error: err
            });
        }
        req.usuario = decoded.usuario;

        next();

      });    
}