
var express = require("express");
var app = express();
var Rol = require("../models/rol");
var mdAutenticacion = require("../middlewares/autenticacion");

// =============================
// OBTENER TODOS LOS ROL
// =============================

app.get("/", (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Rol.find({})
    .skip(desde)
    .limit(5)
    // .populate('nombre', 'nombre email')
    // .populate('hospital')
    .exec((err, roles) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error cargando roles",
                error: err
            });
        }res.status(200).json({
                ok: true,
                roles: roles,
            });
    });
});

// =============================
// ACTUALIZAR ROL
// =============================

app.put("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Rol.findById(id, (err, rol) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar rol",
                error: err
            });
        }
        if (!rol) {
            return res.status(400).json({
                ok: false,
                mensaje: "El rol con el id" + id + "no existe",
                error: "No existe un rol con ese ID"
            });
        }

        rol.nombre = body.nombre;

        rol.save((err, rolGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al actualizar rol",
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                rol: rolGuardado
            });
        });
    });
});

// =============================
// Crear un Rol nuevo
// =============================
app.post("/", (req, res) => {
    // mdAutenticacion.verificaToken
    var body = req.body;

    var rol = new Rol({
        nombre: body.nombre
    });

    rol.save((err, rolGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear un rol",
                error: err
            });
        }
        res.status(201).json({
            ok: true, rol: rolGuardado
        });
    });
});

// =============================
// borrar un rol
// =============================

app.delete("/:id", (req, res) => {
    var id = req.params.id;

    Rol.findByIdAndRemove(id, (err, rolBorrado) => {
        if (err) {
            return res
                .status(400)
                .json({
                    ok: false,
                    mensaje: "Error al borrar un medico",
                    error: err
                });
        }

        if (!rolBorrado) {
            return res
                .status(400)
                .json({
                    ok: false,
                    mensaje: "El rol con el id" + id + "no existe",
                    error: "No existe un rol con ese ID"
                });
        }
        res.status(200).json({ ok: true, rol: rolBorrado });
    });
});

module.exports = app;
