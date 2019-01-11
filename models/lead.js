var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var leadSchema = new Schema({
    id_usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    id_cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    id_semaforo: { type: Schema.Types.ObjectId, ref: 'Semaforo' },
    mensaje: { type: String, required: false },
    fecha_creacion: {type:String, required: true},
    update: {type:String, required: true},
}, {collection: 'leads'});

module.exports = mongoose.model("Lead", leadSchema);