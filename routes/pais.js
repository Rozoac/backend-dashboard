
var express = require("express");
var app = express();
var Pais = require("../models/pais");
var mdAutenticacion = require("../middlewares/autenticacion");

// =============================
// OBTENER TODOS LOS PAISES
// =============================

app.get("/", (req, res, next) => {
    // .populate('nombre', 'nombre email')
    // .populate('hospital')
var desde = req.query.desde || 0;
    desde = Number(desde);
    Pais.find({})
    .skip(desde)
    .limit(10)
    .exec((err, pais) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error cargando pais",
                error: err
            });
        }res.status(200).json({
                ok: true,
                pais
        });
    });
});

// =============================
// ACTUALIZAR PAIS
// =============================

app.put("/:id", (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Pais.findById(id, (err, pais) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar pais",
                error: err
            });
        }

        if (!pais) {
            return res.status(400).json({
                ok: false,
                mensaje: "El pais con el id" + id + "no existe",
                error: "No existe un pais con ese ID"
            });
        }

        pais.nombre = body.nombre;

        pais.save((err, paisGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al actualizar pais",
                    error: err
                });
            }

            res.status(200).json({
                ok: true,
                pais: paisGuardado
            });
        });
    });
});

// =============================
// Crear un Pais Nuevo
// =============================
app.post("/", (req, res) => {
    // mdAutenticacion.verificaToken
    var body = req.body;
    var pais = new Pais({
        nombre: body.nombre
    });

    pais.save((err, paisGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear un pais",
                error: err
            });
        }
        res.status(201).json({
            ok: true, pais: paisGuardado
        });
    });
});

// =============================
// borrar un pais
// =============================

app.delete("/:id", mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Pais.findByIdAndRemove(id, (err, paisBorrado) => {
        if (err) {
            return res
                .status(400)
                .json({
                    ok: false,
                    mensaje: "Error al borrar un pais",
                    error: err
                });
        }

        if (!paisBorrado) {
            return res
                .status(400)
                .json({
                    ok: false,
                    mensaje: "El pais con el id" + id + "no existe",
                    error: "No existe un pais con ese ID"
                });
        }

        res.status(200).json({ ok: true, pais: paisBorrado });
    });
});

module.exports = app;
