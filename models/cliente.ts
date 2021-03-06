import { Schema, model} from "mongoose";


export var clienteSchema:Schema = new Schema({
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
        tipo: {type: String },
        nombre: {type: String, required: false },
     },
    modalidad: { type: String, required: false},
    id_segmento: { type: Schema.Types.ObjectId, ref: 'Segmento' },
    id_pais: { type: Schema.Types.ObjectId, ref: 'Pais' },
    id_ciudad: { type: Schema.Types.ObjectId, ref: 'Ciudad' },
    mensaje: { type: String, required: false },
    id_referido: { type: Schema.Types.ObjectId, ref: 'Referido' },
    fuente: { type: String, required: false },
    fecha_creacion: {type: String, required: true},
    hora_creacion: {type: String, required: true},
    },{collection: 'clientes'});
 
    export const Cliente = model("Cliente", clienteSchema);