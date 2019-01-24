"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var auditoriaSchema = new Schema({
    id_usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    id_cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    evento: { type: String, required: true },
    fecha_ing: { type: String, required: true },
    hora_ing: { type: String, required: true },
    hora_sal: { type: String, required: true }
}, { collection: 'auditorias' });
module.exports = mongoose.model("auditoria", auditoriaSchema);
