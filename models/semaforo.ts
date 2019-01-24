var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var semaforoSchema = new Schema({
  estado: { type: String, required: [true, "El estado es necesario"] },
}, {collection: 'semaforos'});

module.exports = mongoose.model("Semaforo", semaforoSchema);
