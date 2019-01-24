"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.segmentoSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
});
exports.Segmento = mongoose_1.model("Segmento", exports.segmentoSchema);
