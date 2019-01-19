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
   crear:  function(cliente, callback) {
    
  asignarComercial(cliente.id_segmento, cliente.id_pais, function(err, user) {
    const comercial = getRandomString(user);
    var lead = new Lead({
      id_usuario: comercial._id,
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
      return callback(null, leadGuardado)
    });
    
  })
    }
  }

  function getRandomString(array){
    return array[Math.floor(Math.random()*array.length)]
  }


  async function asignarComercial(segment, country, callback) {
    // console.log(segmento);
   await Usuario.find({ segmento : {$all : [segment]}, id_pais: country })
           .populate('id_segmento')
           .populate('id_pais')
           .exec((err, comerciales) => {
            if (err) {
                console.log('se fue a la mierda todo'+ err);
                } 
               return callback(null, comerciales)
    });
  }

  


