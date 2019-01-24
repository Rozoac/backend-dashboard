import { Router, Request, Response } from 'express';
import bcrypt from "bcryptjs";
import {Usuario} from "../models/usuario";
import {SEED} from "../config/config";
import jwt from "jsonwebtoken";
import Server from '../classes/server';
const app = Router();

app.post("/", (req, res) => {
  var body = req.body;
  Usuario.findOne({ correo: body.correo }, (err, usuarioDB:any) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar usuario",
        error: err
      });
    }
    //EMAIL
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        mensaje: "Datos incorrectos - correo",
        error: err
      });
    }
    //PASSWORD
    if (!bcrypt.compareSync(body.clave, usuarioDB.clave)) {
      return res.status(400).json({
        ok: false,
        mensaje: "Datos incorrectos - password",
        error: err
      });
    }
    usuarioDB.clave = ":)";
    //ACA VA EL TOKEN
    var token = jwt.sign({ usuario: usuarioDB }, SEED, {
      expiresIn: 28800
    });



    res.status(200).json({
      ok: true,
      usuario: usuarioDB,
      token: token,
      id: usuarioDB._id
    });
  }).populate('segmento').populate('id_rol');
});

export default app;
