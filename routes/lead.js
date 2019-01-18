var express = require("express");
var bcrypt = require("bcryptjs");
var app = express();
var Usuario = require("../models/usuario");
var Lead = require("../models/lead");
var mdAutenticacion = require("../middlewares/autenticacion");
var moment = require("moment");


// =============================
// Crear un usuario nuevo
// =============================
module.exports = {
  crear: function(cliente) {

      asignarComercial(cliente.id_segmento);

      var lead = new Lead({
        // id_usuario: cliente._id,
        id_cliente: cliente._id,
        // id_semaforo: body.apellido,
        mensaje: cliente.mensaje,
        fecha_creacion: moment().format('L'),
        hora_creacion: moment().format('LT')
      });
    
      lead.save((err, leadGuardado) => {
        if (err) {
          return false;
        }
          return leadGuardado 
      });
    }
  }


  function asignarComercial(segment) {
    // console.log(segmento);

    let comerciales;
    Usuario.find({estado: "ACTIVO", segmento : { $all : [segment] }})
           .populate('id_segmento')
           .exec((err, comerciales) => {
      if (err) {
      console.log('se putio'+ err);
          }

          console.log(comerciales);
    });
  }

  


