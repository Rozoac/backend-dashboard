import { Schema, model} from "mongoose";

export var leadSchema:Schema = new Schema({
    id_usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    id_cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    id_semaforo: { type: Schema.Types.ObjectId, default:'5c4b3f304bec0f00172a8dd3',  ref: 'Semaforo' },
    mensaje: { type: String, required: false },
    fecha_creacion: {type:String, required: true},
    hora_creacion: {type:String, required: true},
    update: {type:String, required: false},
}, {collection: 'leads'});

export const Lead = model("Lead", leadSchema);