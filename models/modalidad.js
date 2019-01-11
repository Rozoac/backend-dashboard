var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var modalidadSchema = new Schema({
    nombre: { type: String, required: true },
}, {collection: 'modalidades'});

module.exports = mongoose.model("Modalidad", modalidadSchema);