"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = require("../models/usuario");
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = express_1.Router();
app.post("/", (req, res) => {
    var body = req.body;
    usuario_1.Usuario.findOne({ correo: body.correo }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar usuario",
                error: err
            });
        }
        //EMAIL
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: "Datos incorrectos - correo",
                error: err
            });
        }
        //PASSWORD
        if (!bcryptjs_1.default.compareSync(body.clave, usuarioDB.clave)) {
            return res.status(400).json({
                ok: false,
                mensaje: "Datos incorrectos - password",
                error: err
            });
        }
        usuarioDB.clave = ":)";
        //ACA VA EL TOKEN
        var token = jsonwebtoken_1.default.sign({ usuario: usuarioDB }, config_1.SEED, {
            expiresIn: 28800
        });
        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    }).populate('segmento').populate('id_rol');
});
exports.default = app;
