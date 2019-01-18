var express = require("express");
var bcrypt = require("bcryptjs");
var app = express();
var jwt = require("jsonwebtoken");
var Usuario = require("../models/usuario");
var mdAutenticacion = require("../middlewares/autenticacion");
var moment = require("moment");


// =============================
// Crear un usuario nuevo
// =============================
module.exports = {
  crear: function(a, b) {
    // app.post("/", (req, res) => {
       
    //   var body = req.body;
    
    //   var usuario = new Usuario({
    //     id_rol: body.id_rol,
    //     nombre: body.nombre,
    //     apellido: body.apellido,
    //     correo: body.correo,
    //     clave: bcrypt.hashSync(body.clave, 10),
    //     celular: body.celular,
    //     segmento: body.segmento,
    //     id_pais: body.id_pais,
    //     fecha_creacion: moment().format('L'),
    //     hora_creacion: moment().format('LT')
    //   });
    
    //   usuario.save((err, usuarioGuardado) => {
    //     if (err) {
    //       return res.status(400).json({
    //         ok: false,
    //         mensaje: "Error al crear un usuario",
    //         error: err
    //       });
    //     }
        
    //     res.status(201).json({ ok: true, usuario: usuarioGuardado });
    //   });
    // });
    return a + b;
  }
}


