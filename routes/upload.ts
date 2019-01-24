import { Router, Request, Response } from 'express';
var fileUpload = require("express-fileupload");
var fs = require("fs");

const app = Router();

app.use(fileUpload());

var Usuario = require("../models/usuario");
var Medico = require("../models/medico");
var Hospital = require("../models/hospital");

app.put("/:tipo/:id", (req:any, res, next) => {
  var tipo = req.params.tipo;
  var id = req.params.id;

  //tipos de colecciom
  var tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Tipo de  no es valida",
      error: {
        mensaje: "seleccione un tipo valido"
      }
    });
  }

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      mensaje: "No seleciono una imagen",
      error: {
        mensaje: "Debe seleccionar una imagen"
      }
    });
  }
  // Obtener el nombre del archivo
  var archivo = req.files.imagen;
  var nombreCortado = archivo.name.split(".");
  var extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // TIPOS DE EXTENSIONES
  var extensionesValidas = ["png", "jpg", "jpeg"];

  if (extensionesValidas.indexOf(extensionArchivo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Extension no valida",
      error: {
        mensaje: "Las extensiones validas son " + extensionesValidas.join(", ")
      }
    });
  }

  //Nombre de archivo personalizada
  var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

  //mover archivo
  var path = `./uploads/${tipo}/${nombreArchivo}`;
  archivo.mv(path, (err:any) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al mover el archivo",
        error: err
      });
    }
    subirPorTipo(tipo, id, nombreArchivo, res);
  });
});

function subirPorTipo(tipo:any, id:any, nombreArchivo:any, res:any) {
  if (tipo === "usuarios") {
    Usuario.findById(id, (err:any, usuario:any) => {
      if (!usuario) {
        return res.status(400).json({
          ok: true,
          mensaje: "Usuario no existe",
          error: { mensaje: "Usuario no existe" }
        });
      }

      var pathViejo = "./uploads/usuarios/" + usuario.img;
      // si existe elimina la imagen anterior
      if (fs.existsSync(pathViejo)) {
        fs.unlink(pathViejo);
      }

      usuario.img = nombreArchivo;
      usuario.save((err:any, usuarioActualizado:any) => {
        usuarioActualizado.password = ":) .!.";
        return res.status(200).json({
          ok: true,
          mensaje: "Imagen de usuario actualizada",
          usuario: usuarioActualizado
        });
      });
    });
  }
  if (tipo === "medicos") {
    Medico.findById(id, (err:any, medico:any) => {
      if (!medico) {
        return res.status(400).json({
          ok: true,
          mensaje: "medico no existe",
          error: { mensaje: "medico no existe" }
        });
      }

      var pathViejo = "./uploads/medicos/" + medico.img;
      // si existe elimina la imagen anterior
      if (fs.existsSync(pathViejo)) {
        fs.unlink(pathViejo);
      }

      medico.img = nombreArchivo;
      medico.save((err:any, medicoActualizado:any) => {
        return res.status(200).json({
          ok: true,
          mensaje: "Imagen de medico actualizada",
          medico: medicoActualizado
        });
      });
    });
  }
  if (tipo === "hospitales") {
    Hospital.findById(id, (err:any, hospital:any) => {
      if (!hospital) {
        return res.status(400).json({
          ok: true,
          mensaje: "hospital no existe",
          error: { mensaje: "hospital no existe" }
        });
      }
      var pathViejo = "./uploads/hositales/" + hospital.img;
      // si existe elimina la imagen anterior
      if (fs.existsSync(pathViejo)) {
        fs.unlink(pathViejo);
      }

      hospital.img = nombreArchivo;
      hospital.save((err:any, hospitalActualizado:any) => {
        return res.status(200).json({
          ok: true,
          mensaje: "Imagen de hospital actualizada",
          usuario: hospitalActualizado
        });
      });
    });
  }
}

export default app;
