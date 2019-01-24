import { Schema, model} from "mongoose";

export var segmentoSchema:Schema = new Schema({
    nombre: { type: String, required: true },
});

export const Segmento = model("Segmento", segmentoSchema);