import { Schema, model} from "mongoose";

export var rolSchema:Schema = new Schema({
  nombre: { type: String, required: [true, "El nombre es necesario"] },
  menu: [{
    titulo: { type: String, required: false},
    icono: { type: String, required: false },
    url: { type: String, required: false }
  }]
}, {collection: 'roles'});

export const Rol = model("Rol", rolSchema);