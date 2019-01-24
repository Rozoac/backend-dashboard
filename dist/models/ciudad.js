"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.ciudadSchema = new mongoose_1.Schema({
    pais: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Pais' },
    nombre: { type: String, required: true },
}, { collection: 'ciudades' });
exports.Ciudad = mongoose_1.model("ciudad", exports.ciudadSchema);
