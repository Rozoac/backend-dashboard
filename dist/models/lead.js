"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.leadSchema = new mongoose_1.Schema({
    id_usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Usuario' },
    id_cliente: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Cliente' },
    id_semaforo: { type: mongoose_1.Schema.Types.ObjectId, default: '5c4b3f304bec0f00172a8dd3', ref: 'Semaforo' },
    mensaje: { type: String, required: false },
    fecha_creacion: { type: String, required: true },
    hora_creacion: { type: String, required: true },
    update: { type: String, required: false },
}, { collection: 'leads' });
exports.Lead = mongoose_1.model("Lead", exports.leadSchema);
