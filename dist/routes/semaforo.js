"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const semaforo_1 = require("../models/semaforo");
const app = express_1.Router();
// =============================
// OBTENER TODOS LOS ESTADOS DE SEMAFORO
// =============================
app.get("/", (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);
    semaforo_1.Semaforo.find({})
        .exec((err, semaforos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error cargando semaforos",
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            semaforos,
        });
    });
});
// =============================
// Crear un semaforo nuevo
// =============================
app.post("/", (req, res) => {
    var body = req.body;
    var semaforo = new semaforo_1.Semaforo({
        estado: body.estado
        // fecha_creacion: moment().format('L'),
        // hora_creacion: moment().format('LT')
    });
    semaforo.save((err, semaforoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear un semaforo",
                error: err
            });
        }
        res.status(201).json({ ok: true, usuario: semaforoGuardado });
    });
});
// =============================
// borrar un semaforo
// =============================
app.delete("/:id", (req, res) => {
    var id = req.params.id;
    semaforo_1.Semaforo.findByIdAndRemove(id, (err, semaforoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al borrar un semaforo",
                error: err
            });
        }
        if (!semaforoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: "El semaforo con el id" + id + "no existe",
                error: "No existe un semaforo con ese ID"
            });
        }
        res.status(200).json({
            ok: true,
            semaforoBorrado
        });
    });
});
exports.default = app;
