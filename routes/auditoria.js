
var express = require("express");
var app = express();
var mdAutenticacion = require("../middlewares/autenticacion");

// =============================
// OBTENER TODOS LAS AUDITORIAS
// =============================

app.get("/", (req, res, next) => {
    // .populate('nombre', 'nombre email')
    // .populate('hospital')
var desde = req.query.desde || 0;
    desde = Number(desde);
    Ciudad.find({})
    .populate('pais', 'nombre')
    .skip(desde)
    .limit(10)
    .exec((err, paises) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error cargando ciudad",
                error: err
            });
        }res.status(200).json({
                ok: true,
                paises
        });
    });
});

// =============================
// ACTUALIZAR AUDITORIA
// =============================

app.put("/:id", (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Ciudad.findById(id, (err, ciudad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar ciudad",
                error: err
            });
        }

        if (!ciudad) {
            return res.status(400).json({
                ok: false,
                mensaje: "La ciudad con el id" + id + "no existe",
                error: "No existe una ciudad con ese ID"
            });
        }

        ciudad.id_pais = body.pais;
        ciudad.nombre = body.nombre;

        ciudad.save((err, ciudadGuardada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al actualizar ciudad",
                    error: err
                });
            }

            res.status(200).json({
                ok: true,
                ciudad: ciudadGuardada
            });
        });
    });
});

// =============================
// Crear una Auditoria
// =============================
function persona (usuario, cliente, evento) {
    console.log(123);
    app.post("/", (req, res) => {
        // mdAutenticacion.verificaToken
        var body = req.body;
        var auditoria = new Auditoria({
            id_usuario: usuario,
            id_cliente: cliente,
            evento: evento,
            fecha_ing: moment().format('L'),
            hora_ing: moment().format('LT'),
            hora_sal: null
        });
    
        auditoria.save((err, auditoriaGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Error al crear una auditoria",
                    error: err
                });
            }
            res.status(201).json({
                ok: true, auditoria: auditoriaGuardada
            });
        }).populate('id_usuario').populate('id_cliente');;
    });
 }



// =============================
// borrar una ciudad
// =============================

app.delete("/:id", (req, res) => {
    var id = req.params.id;

    Ciudad.findByIdAndRemove(id, (err, ciudadBorrada) => {
        if (err) {
            return res
                .status(400)
                .json({
                    ok: false,
                    mensaje: "Error al borrar una ciudad",
                    error: err
                });
        }

        if (!ciudadBorrada) {
            return res
                .status(400)
                .json({
                    ok: false,
                    mensaje: "La ciudad con el id" + id + "no existe",
                    error: "No existe un pais con ese ID"
                });
        }

        res.status(200).json({ ok: true, pais: ciudadBorrada });
    });
});

module.exports = app;
