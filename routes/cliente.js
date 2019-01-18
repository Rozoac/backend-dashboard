var express = require("express");
var bcrypt = require("bcryptjs");
var app = express();
var Cliente = require("../models/cliente");
var mdAutenticacion = require("../middlewares/autenticacion");
var moment = require("moment");

// =============================
// OBTENER USIARIO
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
// OBTENER TODOS LOS USUARIOS
// =============================

app.get("/", (req, res, next) => {

  var desde = req.query.desde || 0;
  desde = Number(desde);

  Usuario.find({})
  .populate('id_rol')
  .skip(desde)
  .limit(20)
  .exec((err, usuarios) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando usuarios",
        error: err
      });
    }
    Usuario.count({}, (err, conteo) => {
      res.status(200).json({
        ok: true,
        usuarios: usuarios,
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
    usuario.segmento = body.segmento;
    usuario._id_pais = body._id_pais ;
    // (usuario.password = bcrypt.hashSync(body.password, 10));

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
    nombre: body.id_rol,
    apellido: body.nombre,
    correo: body.apellido,
    celular: body.correo,
    celular_op: body.correo,
    documento: {
      tipo_documento: body.documento.tipo_documento,
      numero: body.documento.numero
    },
    tipo_cliente: {
      tipo: body.tipo_cliente.tipo_documento,
      nombre: body.tipo_cliente.numero
    },
    id_modalidad: body.id_modalidad,
    id_segmento: body.id_segmento,
    id_pais: body.id_pais,
    id_ciudad: body.id_ciudad,
    mensaje: body.mensaje,
    id_referido: body.id_referido,
    fuente: body.fuente,
    fecha_creacion: moment().format('L'),
    hora_creacion: moment().format('LT')
  });

  cliente.save((err, clienteGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear un cliente",
        error: err
      });
    }
    
    res.status(201).json({ ok: true, cliente: clienteGuardado });
  });
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
