import { Router, Request, Response } from 'express';
import {Segmento} from "../models/segmento";
import {verificaToken} from "../middlewares/autenticacion";
import Server from '../classes/server';

const app = Router();

// =============================
// OBTENER TODOS LOS SEGMENTOS
// =============================

app.get("/", (req, res, next) => {
    // .populate('nombre', 'nombre email')
    // .populate('hospital')
var desde = req.query.desde || 0;
    desde = Number(desde);
    Segmento.find({})
    .skip(desde)
    .limit(10)
    .exec((err:any, segmento:any) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error cargando segmento",
                error: err
            });
        }res.status(200).json({
                ok: true,
                segmento
        });
    });
});

// =============================
// ACTUALIZAR SEGMENTO
// =============================

app.put("/:id", verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Segmento.findById(id, (err:any, segmento:any) => {
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

        segmento.save((err:any, segmentoGuardado:any) => {
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
    var segmento = new Segmento({
        nombre: body.nombre
    });

    segmento.save((err:any, segmentoGuardado:any) => {
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

app.delete("/:id", verificaToken, (req, res) => {
    var id = req.params.id;

    Segmento.findByIdAndRemove(id, (err:any, segmentoBorrado:any) => {
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

export default app;
