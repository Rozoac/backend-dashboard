import { Router, Request, Response } from 'express';
import {Lead} from "../models/lead";
import Server from '../classes/server';


const app = Router();

// =============================
// OBTENER LEAD POR ID
// =============================

app.get("/:id", (req:Request, res:Response, next:any) => {
  var id = req.params.id;
  var desde = req.query.desde || 0;
  desde = Number(desde);
  Lead.find({'id_usuario': id})
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
  .skip(desde)
  .limit(10)
  .exec((err:any, leads:any) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando leads",
        error: err
      });
    }
    Lead.count({'id_usuario': id}, (err:any, conteo:any) => {
      res.status(200).json({
        ok: true,
        leads,
        total: conteo
      });
    });
  });
});
export default app;
