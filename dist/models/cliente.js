"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.clienteSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    celular: { type: String, required: true },
    celular_op: { type: String, required: false },
    documento: {
        tipo_documento: { type: String },
        numero: { type: String }
    },
    tipo_cliente: {
        tipo: { type: String },
        nombre: { type: String, required: false },
    },
    modalidad: { type: String, required: false },
    id_segmento: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Segmento' },
    id_pais: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Pais' },
    id_ciudad: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Ciudad' },
    mensaje: { type: String, required: false },
    id_referido: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Referido' },
    fuente: { type: String, required: false },
    fecha_creacion: { type: String, required: true },
    hora_creacion: { type: String, required: true },
}, { collection: 'clientes' });
exports.Cliente = mongoose_1.model("Cliente", exports.clienteSchema);
