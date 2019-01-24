import { Router, Request, Response } from 'express';
import {Rol} from "../models/rol";
import {verificaToken} from "../middlewares/autenticacion";
import Server from '../classes/server';

const app = Router();


// =============================
// OBTENER TODOS LOS ROL
// =============================

app.get("/", (req:Request, res:Response, next:any) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Rol.find({})
    .skip(desde)
    .limit(5)
    .exec((err:any, roles:any) => {
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

app.put("/:id", verificaToken, (req:Request, res:Response) => {
    var id = req.params.id;
    var body = req.body;

    Rol.findById(id, (err:any, rol:any) => {
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

        rol.save((err:any, rolGuardado:any) => {
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
app.post("/", (req:Request, res:Response) => {
    // mdAutenticacion.verificaToken
    var body = req.body;

    var rol = new Rol({
        nombre: body.nombre
    });

    rol.save((err:any, rolGuardado:any) => {
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

app.delete("/:id", (req:Request, res:Response) => {
    var id = req.params.id;

    Rol.findByIdAndRemove(id, (err:any, rolBorrado:any) => {
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

export default app;
