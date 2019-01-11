var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var referidoSchema = new Schema({
    nombre: { type: String, required: true },
}, {collection: 'referidos'});

module.exports = mongoose.model("Referidos", referidoSchema);