import { Schema, model} from "mongoose";


export var paisSchema:Schema = new Schema({
    nombre: { type: String, required: true },
}, {collection: 'paises'});

export const Pais = model("Pais", paisSchema);