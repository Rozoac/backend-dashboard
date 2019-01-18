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
   crear:  function(cliente) {

   var comercial = asignarComercial(cliente.id_segmento, cliente.id_pais);

      var lead = new Lead({
        // id_usuario: cliente._id,
        id_cliente: cliente._id,
        // id_semaforo: body.apellido,
        mensaje: cliente.mensaje,
        fecha_creacion: moment().format('L'),
        hora_creacion: moment().format('LT')
      });
      console.log(comercial);
    
       lead.save((err, leadGuardado) => {
        if (err) {
          return false;
        }
        // console.log(leadGuardado);
          return  leadGuardado 
      });
    }
  }


  async function asignarComercial(segment, country) {
    // console.log(segmento);
   await Usuario.find({estado: "ACTIVO", segmento : {$all : [segment]}, id_pais: country })
           .populate('id_segmento')
           .populate('id_pais')
           .exec((err, comerciales) => {
            if (err) {
                console.log('se fue a la mierda todo'+ err);
                } 
                return comerciales; 
    });
  }

  


