var express = require("express");
var bcrypt = require("bcryptjs");
var app = express();
var jwt = require("jsonwebtoken");
var Lead = require("../models/lead");
var mdAutenticacion = require("../middlewares/autenticacion");
var moment = require("moment");


// =============================
// Crear un usuario nuevo
// =============================
module.exports = {
  crear: function(cliente) {
      var lead = new Lead({
        // id_usuario: cliente._id,
        // id_cliente: body.nombre,
        // id_semaforo: body.apellido,
        mensaje: "asd",
        fecha_creacion: moment().format('L'),
        hora_creacion: moment().format('LT')
      });
    
      lead.save((err, leadGuardado) => {
        if (err) {
          return false;
        }
        
        return leadGuardado });
    }
  }


