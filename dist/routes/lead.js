"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_1 = require("../models/lead");
const app = express_1.Router();
// =============================
// ACTUALIZAR ESTADO DEL SEMAFORO LEAD A ROJO
// =============================
app.put("/:id", (req, res) => {
    var id = req.params.id;
    var body = req.body;
    lead_1.Lead.findById(id, (err, lead) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar lead",
                error: err
            });
        }
        if (!lead) {
            return res.status(400).json({
                ok: false,
                mensaje: "El lead con el id" + id + "no existe",
                error: "No existe un lead con ese ID"
            });
        }
        lead.id_semaforo = '5c4b576af1848a00177ab14a';
        lead.save((err, leadGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al actualizar lead",
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                lead: leadGuardado
            });
        });
    });
});
// =============================
// OBTENER LEAD POR ID
// =============================
app.get("/:id", (req, res, next) => {
    var id = req.params.id;
    // var desde = req.query.desde || 0;
    // desde = Number(desde);
    lead_1.Lead.find({ 'id_usuario': id })
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
            model: 'ciudad'
            // select: 'autenticacion direccion'
        }
    })
        .populate('id_semaforo')
        // .skip(desde)
        // .limit(10)
        .exec((err, leads) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error cargando leads",
                error: err
            });
        }
        lead_1.Lead.count({ 'id_usuario': id }, (err, conteo) => {
            res.status(200).json({
                ok: true,
                leads,
                total: conteo
            });
        });
    });
});
// =============================
// OBTENER LEAD SIN LEER
// =============================
app.get("/nuevo/:id", (req, res, next) => {
    var id = req.params.id;
    lead_1.Lead.find({ 'id_usuario': id, 'id_semaforo._id': '5c4b5744f1848a00177ab148' })
        .populate({
        path: "id_cliente",
        populate: {
            path: 'id_segmento',
            model: 'Segmento'
        }
    })
        .populate({
        path: "id_cliente",
        populate: {
            path: 'id_ciudad',
            model: 'ciudad'
        }
    })
        .populate('id_semaforo')
        .exec((err, leads) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error cargando leads",
                error: err
            });
        }
        lead_1.Lead.count({ 'id_usuario': id, 'id_semaforo._id': '5c4b5744f1848a00177ab148' }, (err, conteo) => {
            res.status(200).json({
                ok: true,
                leads,
                total: conteo
            });
        });
    });
});
exports.default = app;
