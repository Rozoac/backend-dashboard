import { Router, Request, Response } from 'express';
import {Pais} from "../models/pais";
import {verificaToken} from "../middlewares/autenticacion";
import Server from '../classes/server';

const app = Router();

// =============================
// OBTENER TODOS LOS PAISES
// =============================

app.get("/", (req:Request, res:Response, next:any) => {
var desde = req.query.desde || 0;
    desde = Number(desde);
    Pais.find({})
    .skip(desde)
    .limit(10)
    .exec((err:any, pais:any) => {
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

app.put("/:id", (req:Request, res:Response) => {
    var id = req.params.id;
    var body = req.body;

    Pais.findById(id, (err:any, pais:any) => {
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

        pais.save((err:any, paisGuardado:any) => {
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
app.post("/", (req:Request, res:Response) => {
    // mdAutenticacion.verificaToken
    var body = req.body;
    var pais = new Pais({
        nombre: body.nombre
    });

    pais.save((err:any, paisGuardado:any) => {
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

app.delete("/:id", verificaToken, (req:Request, res:Response) => {
    var id = req.params.id;

    Pais.findByIdAndRemove(id, (err:any, paisBorrado:any) => {
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

export default app;
