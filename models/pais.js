var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var paisSchema = new Schema({
    nombre: { type: String, required: true },
}, {collection: 'paises'});

module.exports = mongoose.model("Pais", paisSchema);