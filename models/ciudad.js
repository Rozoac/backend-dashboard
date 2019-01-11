var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ciudadSchema = new Schema({
    pais: { type: Schema.Types.ObjectId, ref: 'Pais' },
    nombre: { type: String, required: true },
}, {collection: 'ciudades'});

module.exports = mongoose.model("ciudad", ciudadSchema);