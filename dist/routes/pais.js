"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pais_1 = require("../models/pais");
const autenticacion_1 = require("../middlewares/autenticacion");
const app = express_1.Router();
// =============================
// OBTENER TODOS LOS PAISES
// =============================
app.get("/", (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    pais_1.Pais.find({})
        .skip(desde)
        .limit(10)
        .exec((err, pais) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error cargando pais",
                error: err
            });
        }
        res.status(200).json({
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
    pais_1.Pais.findById(id, (err, pais) => {
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
    var pais = new pais_1.Pais({
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
app.delete("/:id", autenticacion_1.verificaToken, (req, res) => {
    var id = req.params.id;
    pais_1.Pais.findByIdAndRemove(id, (err, paisBorrado) => {
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
exports.default = app;
