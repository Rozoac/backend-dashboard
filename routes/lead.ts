import { Router, Request, Response } from 'express';
import {Lead} from "../models/lead";
import Server from '../classes/server';


const app = Router();
const server = Server.instance;

// =============================
// ACTUALIZAR ESTADO DEL SEMAFORO LEAD A ROJO
// =============================

app.put("/:id", (req, res) => {
  var id = req.params.id;
  var body = req.body;

  Lead.findById(id, (err:any, lead:any) => {
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

    lead.id_semaforo = '5c4b576af1848a00177ab14a' ;


    lead.save((err:any, leadGuardado:any) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al actualizar lead",
          error: err
        });
      }
        //bsuqueda de lead
        console.log(leadGuardado);
        server.io.emit('leads-nuevos',leadGuardado);

      res.status(200).json({
        ok: true,
        lead: leadGuardado
      });
    })
});
});

// =============================
// OBTENER LEAD POR ID
// =============================

app.get("/:id", (req:Request, res:Response, next:any) => {
  var id = req.params.id;
  // var desde = req.query.desde || 0;
  // desde = Number(desde);
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
  // .skip(desde)
  // .limit(10)
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
// =============================
// OBTENER LEAD SIN LEER
// =============================

app.get("/nuevo/:id", (req:Request, res:Response, next:any) => {
  var id = req.params.id;
  
  Lead.find({id_usuario : id , id_semaforo: '5c4b5744f1848a00177ab148'})
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
  
 
  .exec((err:any, leads:any) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando leads",
        error: err
      });
    }
    Lead.count({id_usuario : id, id_semaforo : '5c4b5744f1848a00177ab148'}, (err:any, conteo:any) => {
      res.status(200).json({
        ok: true,
        leads,
        total: conteo
      });
    });
  });
});
export default app;
