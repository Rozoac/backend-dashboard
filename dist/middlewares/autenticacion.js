"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
// =============================
// VERIFICAR EL TOKEN
// =============================
exports.verificaToken = (req, res, next) => {
    var token = req.query.token;
    jsonwebtoken_1.default.verify(token, config_1.SEED, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({
                ok: false,
                mensaje: "Token incorrecto",
                error: err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};
