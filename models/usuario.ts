import { Schema, model} from "mongoose";
const { ObjectId } = Schema.Types;

var estadosValidos = {
    values: ['ACTIVO', 'INACTIVO'],
    message: '{VALUE} no es un rol permitido'
};

export var usuarioSchema:Schema = new Schema({
    id_rol: {type: ObjectId, ref: 'Rol', required: [true, 'El rol es obligatorio']},
    estado:{ type: String, required: true, default: 'ACTIVO', enum: estadosValidos },
    nombre: {type: String, required: [true, 'El nombre es obligatorio']},
    apellido: {type: String, required: [true, 'El apellido es obligatorio']},
    correo: {type: String, unique:[true, 'El correo debe ser unico'], required: [true, 'El correo es necesario']},
    clave:  {type: String, required: [true, 'la clave es necesaria']},
    celular: { type: Number, required: [true, 'El celular es obligatorio']},
    imagen: { type: String, required: false},
    segmento: [{type: ObjectId, ref: 'Segmento', required: false,}],
    id_pais: {type: ObjectId, ref: 'Pais', required: [false, 'El pais es obligatorio']},
    fecha_creacion: {type: String, required: false},
    hora_creacion: {type: String, required: false},
    update: {type: String, required: false},
}, {collection: 'usuarios'});

export const Usuario = model("User", usuarioSchema);
