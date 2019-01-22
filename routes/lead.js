var express = require("express");
var bcrypt = require("bcryptjs");
var app = express();
var Usuario = require("../models/usuario");
var Lead = require("../models/lead");
var mdAutenticacion = require("../middlewares/autenticacion");
var moment = require("moment");



// =================================
// Obtener leads de comercial por id
// =================================
app.get("/", (req, res, next) => {

  var id = req.params.id;
  var desde = req.query.desde || 0;
  desde = Number(desde);

  Lead.find({'id_usuario':ObjectId(id)})
  .skip(desde)
  .limit(20)
  .exec((err, clientes) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando leads",
        error: err
      });
    }
    Usuario.count({}, (err, conteo) => {
      res.status(200).json({
        ok: true,
        clientes,
        total: conteo
      });
    });
  });
});

// =============================
// Crear un lead nuevo
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
      lead.populate('id_usuario', function(err) {
      lead.populate('id_cliente', function(err) {
      lead.save((err, leadGuardado) => {
        if (err) {
          return false;
        }
        console.log(leadGuardado);
        return callback(null, leadGuardado)
      });
      });
      });
    })
  }
}
// ============================================
// Sacar una posicion del arreglo aleatoriamente
// ============================================
  function getRandomString(array){
    return array[Math.floor(Math.random()*array.length)]
  }

// ============================================
// Asignar un comercial
// ============================================
  async function asignarComercial(segment, country, callback) {
   await Usuario.find({ segmento : {$all : [segment]}, id_pais: country },'nombre apellido correo ')
           .populate('id_segmento')
           .populate('id_pais')
           .exec((err, comerciales) => {
            if (err) {
                console.log('se fue a la mierda todo'+ err);
                } 
               return callback(null, comerciales)
    });
  }

  


