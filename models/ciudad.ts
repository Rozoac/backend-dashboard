import { Schema, model} from "mongoose";


export var ciudadSchema:Schema = new Schema({
    pais: { type: Schema.Types.ObjectId, ref: 'Pais' },
    nombre: { type: String, required: true },
}, {collection: 'ciudades'});

export const Ciudad = model("ciudad", ciudadSchema);