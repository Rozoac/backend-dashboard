var express = require("express");
var app = express();
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

app.post("/", (req, res) => {
   
    singleUpload(req, res, (err) =>{
        if(err){
            return res.status(422).send({
                errors: [{
                    title: 'Error al cargar archivo',
                    detail: err.message
                }] 
            });
        }
        return res.status(201).json({
            'imageUrl': req.file.location
        });
    });
  });

  module.exports = app;