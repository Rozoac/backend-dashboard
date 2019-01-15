var express = require("express");
var app = express();
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');
var Usuario = require("../models/usuario");

app.post("/:tipo/:id", (request, response) => {
var tipo = request.params.tipo;
var id = request.params.id;
 
    singleUpload(request, response, (err) =>{
        if(err){
            return response.status(422).send({
                errors: [{
                    title: 'Error al cargar archivo',
                    detail: err.message
                }] 
            });
        }
        subirPorTipo(request, tipo, id, response, request.file.location);
        // return response.status(201).json({
        //     'imageUrl': request.file.location
        // });
    });
  });


  function subirPorTipo(req, tipo, id, res, nombreArchivo) {

    if (tipo === "usuarios") {
        Usuario.findById(id, (err, usuario) => {
          if (!usuario) {
            return res.status(400).json({
              ok: true,
              mensaje: "Usuario no existe",
              error: { mensaje: "Usuario no existe" }
            });
          }
          usuario.imagen = nombreArchivo;
          usuario.save((err, usuarioActualizado) => {
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

  module.exports = app;