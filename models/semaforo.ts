import { Schema, model} from "mongoose";

export var semaforoSchema = new Schema({
  estado: { type: String, required: [true, "El estado es necesario"] },
  color: { type: String, required: [true, "El color es necesario"] },

});

export const Semaforo = model("Semaforo", semaforoSchema);
//prueba

