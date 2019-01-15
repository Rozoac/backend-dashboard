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
        subirPorTipo(request, tipo, id, response, req.file.location);
        // return response.status(201).json({
        //     'imageUrl': request.file.location
        // });
    });
  });


  function subirPorTipo(req, tipo, id, res, nombreArchivo) {
    console.log(nombreArchivo);
    console.log(req.file.location);
  }

  module.exports = app;