"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../models/usuario");
const lead_1 = require("../models/lead");
const moment_1 = __importDefault(require("moment"));
const server_1 = __importDefault(require("../classes/server"));
// =============================
// Crear un lead nuevo
// =============================
class CrearLead {
    constructor() {
        this.crear = (cliente, callback) => {
            this.asignarComercial(cliente.id_segmento, cliente.id_pais, (err, user) => {
                const comercial = this.getRandomString(user);
                const server = server_1.default.instance;
                var lead = new lead_1.Lead({
                    id_usuario: comercial._id,
                    id_cliente: cliente._id,
                    id_semaforo: '5c4b3f244bec0f00172a8dd1',
                    mensaje: cliente.mensaje,
                    fecha_creacion: moment_1.default().format('L'),
                    hora_creacion: moment_1.default().format('LT')
                });
                lead.populate({ path: 'id_cliente', populate: { path: 'id_ciudad', model: 'Ciudad' } }, (err) => {
                    lead.populate({ path: 'id_cliente', populate: { path: 'id_segmento', model: 'Segmento' } }, (err) => {
                        lead.populate({ path: 'id_semaforo' }, (err) => {
                            lead.populate('id_usuario', (err) => {
                                lead.save((err, leadGuardado) => {
                                    if (err) {
                                        return false;
                                    }
                                    server.io.emit('respuesta-leads', leadGuardado);
                                    return callback(null, leadGuardado);
                                });
                            });
                        });
                    });
                });
            });
        };
        // ============================================
        // Sacar una posicion del arreglo aleatoriamente
        // ============================================
        this.getRandomString = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        };
        // ============================================
        // Asignar un comercial
        // ============================================
        this.asignarComercial = (segment, country, callback) => __awaiter(this, void 0, void 0, function* () {
            yield usuario_1.Usuario.find({ segmento: { $all: [segment] }, id_pais: country }, 'nombre apellido correo ')
                .populate('id_segmento')
                .populate('id_pais')
                .exec((err, comerciales) => {
                if (err) {
                    console.log('se fue a la mierda todo' + err);
                }
                return callback(null, comerciales);
            });
        });
    }
}
exports.CrearLead = CrearLead;
