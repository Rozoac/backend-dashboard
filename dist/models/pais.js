"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.paisSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
}, { collection: 'paises' });
exports.Pais = mongoose_1.model("Pais", exports.paisSchema);
