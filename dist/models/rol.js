"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.rolSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, "El nombre es necesario"] },
    menu: [{
            titulo: { type: String, required: false },
            icono: { type: String, required: false },
            url: { type: String, required: false }
        }]
}, { collection: 'roles' });
exports.Rol = mongoose_1.model("Rol", exports.rolSchema);
