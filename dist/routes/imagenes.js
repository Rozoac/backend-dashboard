"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var path = require('path');
var fs = require('fs');
const app = express_1.Router();
app.get("/:tipo/:img", (req, res, next) => {
    var tipo = req.params.tipo;
    var img = req.params.img;
    var pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${img}`);
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    }
    else {
        var pathNoImagen = path.resolve(__dirname, '../assets/no-image.png');
        res.sendFile(pathNoImagen);
    }
});
exports.default = app;
