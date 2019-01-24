"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_1 = require("../models/lead");
const app = express_1.Router();
// =============================
// OBTENER LEAD POR ID
// =============================
app.get("/:id", (req, res, next) => {
    var id = req.params.id;
    var desde = req.query.desde || 0;
    desde = Number(desde);
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
        .skip(desde)
        .limit(10)
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
exports.default = app;
