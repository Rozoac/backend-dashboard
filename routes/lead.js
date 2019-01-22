var express = require("express");
var Usuario = require("../models/usuario");
var Lead = require("../models/lead");
var app = express();



// =============================
// OBTENER LEAD POR ID
// =============================

app.get("/:id", (req, res, next) => {
  var id = req.params.id;
  var desde = req.query.desde || 0;
  desde = Number(desde);

  Lead.find({'id_usuario': id})
  .populate({
    path: "id_cliente",
    // select: 'url fecha text route_image menu slide',
    populate: {
      path: 'id_segmento',
      model: 'Segmento'
      // select: 'autenticacion direccion'
    }
  })
  .populate({
    path: "id_cliente",
    // select: 'url fecha text route_image menu slide',
    populate: {
      path: 'id_ciudad',
      model: 'Ciudad'
      // select: 'autenticacion direccion'
    }
  })
  .skip(desde)
  .limit(10)
  .exec((err, leads) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando leads",
        error: err
      });
    }
    Lead.count({'id_usuario': id}, (err, conteo) => {
      res.status(200).json({
        ok: true,
        leads,
        total: conteo
      });
    });
  });
});

module.exports = app;  
