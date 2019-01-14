var express = require("express");
var app = express();
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

app.post("/", (req, res) => {
   
    singleUpload(req, res, () =>{
        return res.status(201).json({
            'imageUrl': req.file.location
        });
    });
  });

  module.exports = app;