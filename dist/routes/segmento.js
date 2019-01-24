"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const segmento_1 = require("../models/segmento");
const autenticacion_1 = require("../middlewares/autenticacion");
const app = express_1.Router();
// =============================
// OBTENER TODOS LOS SEGMENTOS
// =============================
app.get("/", (req, res, next) => {
    // .populate('nombre', 'nombre email')
    // .populate('hospital')
    var desde = req.query.desde || 0;
    desde = Number(desde);
    segmento_1.Segmento.find({})
        .skip(desde)
        .limit(10)
        .exec((err, segmento) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error cargando segmento",
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            segmento
        });
    });
});
// =============================
// ACTUALIZAR SEGMENTO
// =============================
app.put("/:id", autenticacion_1.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    segmento_1.Segmento.findById(id, (err, segmento) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar segmento",
                error: err
            });
        }
        if (!segmento) {
            return res.status(400).json({
                ok: false,
                mensaje: "El segmento con el id" + id + "no existe",
                error: "No existe un segmento con ese ID"
            });
        }
        segmento.nombre = body.nombre;
        segmento.save((err, segmentoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al actualizar segmento",
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                segmento: segmentoGuardado
            });
        });
    });
});
// =============================
// Crear un Segmento Nuevo
// =============================
app.post("/", (req, res) => {
    // mdAutenticacion.verificaToken
    var body = req.body;
    var segmento = new segmento_1.Segmento({
        nombre: body.nombre
    });
    segmento.save((err, segmentoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear un segmento",
                error: err
            });
        }
        res.status(201).json({
            ok: true, segmento: segmentoGuardado
        });
    });
});
// =============================
// borrar un segmento
// =============================
app.delete("/:id", autenticacion_1.verificaToken, (req, res) => {
    var id = req.params.id;
    segmento_1.Segmento.findByIdAndRemove(id, (err, segmentoBorrado) => {
        if (err) {
            return res
                .status(400)
                .json({
                ok: false,
                mensaje: "Error al borrar un segmento",
                error: err
            });
        }
        if (!segmentoBorrado) {
            return res
                .status(400)
                .json({
                ok: false,
                mensaje: "El segmento con el id" + id + "no existe",
                error: "No existe un segmento con ese ID"
            });
        }
        res.status(200).json({ ok: true, segmento: segmentoBorrado });
    });
});
exports.default = app;
