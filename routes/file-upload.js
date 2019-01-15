var express = require("express");
var app = express();
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');
var Usuario = require("../models/usuario");

app.post("/:tipo/:id", (req, res) => {
var tipo = req.params.tipo;
var id = req.params.id;
 
    singleUpload(req, res, (err) =>{
        if(err){
            return res.status(422).send({
                errors: [{
                    title: 'Error al cargar archivo',
                    detail: err.message
                }] 
            });
        }
        subirPorTipo(res);
        // return res.status(201).json({
        //     'imageUrl': req.file.location
        // });
    });
  });


  function subirPorTipo(res) {
    // if (tipo === "usuarios") {
    //   Usuario.findById(id, (err, usuario) => {
    //     if (!usuario) {
    //       return res.status(400).json({
    //         ok: true,
    //         mensaje: "Usuario no existe",
    //         error: { mensaje: "Usuario no existe" }
    //       });
    //     }
  
    //     usuario.imagen = nombreArchivo;
    //     usuario.save((err, usuarioActualizado) => {
    //       usuarioActualizado.password = ':)';
    //       return res.status(200).json({
    //         ok: true,
    //         mensaje: "Imagen de usuario actualizada",
    //         imageUrl: req,
    //         usuario: usuarioActualizado
    //       });
    //     });
    //   });
    // }

      return res.status(201).json({
             'imageUrl': req.file.location
         });


  }

  module.exports = app;