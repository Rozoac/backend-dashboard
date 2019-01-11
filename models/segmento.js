var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var segmentoSchema = new Schema({
    nombre: { type: String, required: true },
});

module.exports = mongoose.model("Segmento", segmentoSchema);