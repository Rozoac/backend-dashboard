
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tipoClienteSchema = new Schema({
    nombre: { type: String, required: true },
}, {collection: 'tipoClientes'});

module.exports = mongoose.model("TipoCliente", tipoClienteSchema);