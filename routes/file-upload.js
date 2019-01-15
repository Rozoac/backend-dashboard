var express = require("express");
var app = express();
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');
var Usuario = require("../models/usuario");

app.post("/:tipo/:id", (request, response) => {
var tipo = request.params.tipo;
var id = request.params.id;
 
    singleUpload(request, res, (err) =>{
        if(err){
            return res.status(422).send({
                errors: [{
                    title: 'Error al cargar archivo',
                    detail: err.message
                }] 
            });
        }
        // subirPorTipo(req, tipo, id, res, req.file.location);
        return res.status(201).json({
            'imageUrl': request.file.location
        });
    });
  });


  function subirPorTipo(req, tipo, id, res, nombreArchivo) {
    if (tipo === "usuarios") {
     
            return res.status(200).json({
              ok: true,
              mensaje: "Imagen de usuario actualizada",
              imageUrl: req,
              usuario: usuarioActualizado
            });
          };


  }

  module.exports = app;