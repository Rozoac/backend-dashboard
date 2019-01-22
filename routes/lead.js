var express = require("express");
var Usuario = require("../models/usuario");
var Lead = require("../models/lead");
var app = express();



// =============================
// OBTENER LEAD POR ID
// =============================

app.get("/", (req, res, next) => {
  var id = req.params.id;
  var desde = req.query.desde || 0;
  desde = Number(desde);

  Lead.find({'id_usuario': id})
  .skip(desde)
  .limit(20)
  .exec((err, leads) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando leads",
        error: err
      });
    }
    Lead.count({}, (err, conteo) => {
      res.status(200).json({
        ok: true,
        leads,
        total: conteo
      });
    });
  });
});

module.exports = app;  
