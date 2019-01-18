var express = require("express");
var bcrypt = require("bcryptjs");
var app = express();
var Cliente = require("../models/cliente");
var mdAutenticacion = require("../middlewares/autenticacion");
var moment = require("moment");
var lead = require("./lead");

// =============================
// OBTENER CLIENTE
// =============================
app.get("/:id", (req, res, next) => {
  var id = req.params.id;

  Usuario.findById(id)
  .populate('segmento')
  .populate('id_rol')
    .exec((err, usuario) => {
      if (err) {
        return res
          .status(500)
          .json({
            ok: false,
            mensaje: "Error cargando usuario",
            error: err
          });
      }
      if (!usuario) {
        return res
          .status(400)
          .json({
            ok: false,
            mensaje: "El usuario con el id " + id + " no existe",
            errors: { message: "No existe un usuario con ese ID" }
          });
      }
      res.status(200).json({ ok: true, usuario });
    });
});

// =============================
// OBTENER TODOS LOS CLIENTES
// =============================

app.get("/", (req, res, next) => {

  var desde = req.query.desde || 0;
  desde = Number(desde);

  Cliente.find({})
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

// =============================
// ACTUALIZAR USUARIO
// =============================

app.put("/:id", mdAutenticacion.verificaToken, (req, res) => {
  var id = req.params.id;
  var body = req.body;

  Usuario.findById(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar usuario",
        error: err
      });
    }

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: "El usuario con el id" + id + "no existe",
        error: "No existe un usuario con ese ID"
      });
    }

    usuario.nombre = body.nombre ;
    usuario.apellido = body.apellido ;
    usuario.correo = body.correo ;
    usuario.celular = body.celular ;
    usuario.estado = body.estado ;
    usuario.id_segmento = body.id_segmento;
    usuario._id_pais = body._id_pais ;
    usuario.modalidad = body.modalidad ;

    usuario.save((err, usuarioGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al actualizar usuario",
          error: err
        });
      }
      // usuarioGuardado.password = "NO SEA SAPO!!!";
      res.status(200).json({
        ok: true,
        usuario: usuarioGuardado
      });
    })
  });
});

// =============================
// Crear un cliente nuevo
// =============================
app.post("/", (req, res) => {
   
  var body = req.body;

  var cliente = new Cliente({
    nombre: body.nombre,
    apellido: body.apellido,
    correo: body.correo,
    celular: body.celular,
    celular_op: body.celular_op,
    documento: body.documento,
    tipo_cliente: body.tipo_cliente,
    modalidad: body.modalidad,
    id_segmento: body.id_segmento,
    id_pais: body.id_pais,
    id_ciudad: body.id_ciudad,
    mensaje: body.mensaje,
    id_referido: body.id_referido,
    fuente: body.fuente,
    fecha_creacion: moment().format('L'),
    hora_creacion: moment().format('LT')
  });
  // cliente.populate('id_segmento', function(err) {
    cliente.save((err, clienteGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al crear un cliente",
          error: err
        });
      }
      var leadRespuesta =  lead.crear(clienteGuardado)
      // console.log(leadRespuesta);
      res.status(201).json({ ok: true, cliente: clienteGuardado, leadRespuesta: leadRespuesta});
    })   
  // });
});

// =============================
// borrar un usuario
// =============================

app.delete("/:id", (req, res) => {
  var id = req.params.id;

  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear un usuario",
        error: err
      });
    }

    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "El usuario con el id" + id + "no existe",
        error: "No existe un usuario con ese ID"
      });
    }

    res.status(200).json({
      ok: true,
      usuario: usuarioBorrado
    });
  });
});

module.exports = app;
