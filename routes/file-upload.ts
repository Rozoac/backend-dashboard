
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import upload from '../services/file-upload';
import {Usuario} from "../models/usuario";

const singleUpload = upload.single('image');
const app = Router();


app.post("/:tipo/:id", (request:any, response:Response) => {
var tipo = request.params.tipo;
var id = request.params.id;
 
    singleUpload(request, response, (err:any) =>{
        if(err){
            return response.status(422).send({
                errors: [{
                    title: 'Error al cargar archivo',
                    detail: err.message
                }] 
            });
        }
        subirPorTipou(request, tipo, id, response, request.file.location);
        // return response.status(201).json({
        //     'imageUrl': request.file.location
        // });
    });
  });


  function subirPorTipou(req:Request, tipo:any, id:string, res:Response, nombreArchivo:string) {

    if (tipo === "usuarios") {
        Usuario.findById(id, (err, usuario:any) => {
          if (!usuario) {
            return res.status(400).json({
              ok: true,
              mensaje: "Usuario no existe",
              error: { mensaje: "Usuario no existe" }
            });
          }
          usuario.imagen = nombreArchivo;
          usuario.save((err:any, usuarioActualizado:any) => {
            usuarioActualizado.clave = ":) .!.";
            return res.status(200).json({
              ok: true,
              mensaje: "Imagen de usuario actualizada",
              usuario: usuarioActualizado
            });
          });
        });
      }
  }

  export default app;