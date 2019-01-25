"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.semaforoSchema = new mongoose_1.Schema({
    estado: { type: String, required: [true, "El estado es necesario"] },
});
exports.Semaforo = mongoose_1.model("Semaforo", exports.semaforoSchema);
