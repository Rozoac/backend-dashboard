var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var rolSchema = new Schema({
  nombre: { type: String, required: [true, "El nombre es necesario"] },
  menu: [{
    titulo: { type: String, required: false},
    icono: { type: String, required: false },
    url: { type: String, required: false }
  }]
}, {collection: 'roles'});

module.exports = mongoose.model("Rol", rolSchema);
