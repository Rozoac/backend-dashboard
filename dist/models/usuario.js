"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Schema.Types;
var estadosValidos = {
    values: ['ACTIVO', 'INACTIVO'],
    message: '{VALUE} no es un rol permitido'
};
exports.usuarioSchema = new mongoose_1.Schema({
    id_rol: { type: ObjectId, ref: 'Rol', required: [true, 'El rol es obligatorio'] },
    estado: { type: String, required: true, default: 'ACTIVO', enum: estadosValidos },
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellido: { type: String, required: [true, 'El apellido es obligatorio'] },
    correo: { type: String, unique: [true, 'El correo debe ser unico'], required: [true, 'El correo es necesario'] },
    clave: { type: String, required: [true, 'la clave es necesaria'] },
    celular: { type: Number, required: [true, 'El celular es obligatorio'] },
    imagen: { type: String, required: false },
    segmento: [{ type: ObjectId, ref: 'Segmento', required: false, }],
    id_pais: { type: ObjectId, ref: 'Pais', required: [false, 'El pais es obligatorio'] },
    fecha_creacion: { type: String, required: false },
    hora_creacion: { type: String, required: false },
    update: { type: String, required: false },
}, { collection: 'usuarios' });
exports.Usuario = mongoose_1.model("User", exports.usuarioSchema);
