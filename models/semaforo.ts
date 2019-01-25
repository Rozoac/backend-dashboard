import { Schema, model} from "mongoose";

export var semaforoSchema = new Schema({
  estado: { type: String, required: [true, "El estado es necesario"] },
}, {collection: 'semaforos'});

export const Semaforo = model("Semaforo", semaforoSchema);

