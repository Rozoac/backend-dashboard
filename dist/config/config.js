"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//CLAVE JWT
exports.SEED = "clavesita-op!difil-elcesar123";
//PUERTO
exports.PUERTO = process.env.PORT || 3000;
//ENTORNO
exports.ENTORNO = process.env.NODE_ENV || 'dev';
//BASE DE DATOS
exports.URLDB = ((exports.ENTORNO === 'dev') ? 'mongodb://localhost:27017/dashboard' : "mongodb://wSBwbsRWOT:rEY5SRCEWV@ds257314.mlab.com:57314/econtainers");
