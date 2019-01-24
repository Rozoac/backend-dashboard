"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_upload_1 = __importDefault(require("../services/file-upload"));
const usuario_1 = require("../models/usuario");
const singleUpload = file_upload_1.default.single('image');
const app = express_1.Router();
app.post("/:tipo/:id", (request, response) => {
    var tipo = request.params.tipo;
    var id = request.params.id;
    singleUpload(request, response, (err) => {
        if (err) {
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
function subirPorTipou(req, tipo, id, res, nombreArchivo) {
    if (tipo === "usuarios") {
        usuario_1.Usuario.findById(id, (err, usuario) => {
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
exports.default = app;
