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

  Cliente.find({'id_usuario':ObjectId(id)})
  .skip(desde)
  .limit(20)
  .exec((err, clientes) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando clientes",
        error: err
      });
    }
    Cliente.count({}, (err, conteo) => {
      res.status(200).json({
        ok: true,
        clientes,
        total: conteo
      });
    });
  });
});

module.exports = app;  
