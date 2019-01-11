var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var clienteSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    celular: { type: String, required: true },
    celular_op: { type: String, required: true },
    tipo_cliente: { type: String, required: true },
    cedula: { type: String, required: false },
    nit: { type: String, required: false },
    id_modalidad: { type: Schema.Types.ObjectId, ref: 'Modalidad' },
    id_segmento: { type: Schema.Types.ObjectId, ref: 'Segmento' },
    id_pais: { type: Schema.Types.ObjectId, ref: 'Pais' },
    id_ciudad: { type: Schema.Types.ObjectId, ref: 'Ciudad' },
    mensaje: { type: String, required: false },
    id_referido: { type: Schema.Types.ObjectId, ref: 'Referido' },
    empresa: { type: String, required: false },
    fuente: { type: String, required: false },
    fecha: {type: String, required: true},
    hora: {type: String, required: true},
}, {collection: 'clientes'});

module.exports = mongoose.model("Cliente", clienteSchema);