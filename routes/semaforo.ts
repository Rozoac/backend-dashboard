
import { Router, Request, Response } from 'express';
import {Semaforo} from "../models/semaforo";
import moment from "moment";
import Server from '../classes/server';

const app = Router();


// =============================
// OBTENER TODOS LOS ESTADOS DE SEMAFORO
// =============================

app.get("/", (req, res, next) => {

  var desde = req.query.desde || 0;
  desde = Number(desde);

  Semaforo.find({})
  .exec((err:any, semaforos:any) => {
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
  var semaforo = new Semaforo({
    estado: body.estado
    // fecha_creacion: moment().format('L'),
    // hora_creacion: moment().format('LT')
  });
  semaforo.save((err:any, semaforoGuardado:any) => {
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

  Semaforo.findByIdAndRemove(id, (err:any, semaforoBorrado:any) => {
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
export default app;
