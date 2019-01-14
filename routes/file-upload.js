var express = require("express");
var app = express();
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

app.post("/", (req, res) => {
   
    singleUpload(req1, res, (err) =>{
        if(err){
            console.log(err);
        }
        console.log(req1);
        return res.status(201).json({
            'imageUrl': req1.file.location
        });
    });
  });

  module.exports = app;