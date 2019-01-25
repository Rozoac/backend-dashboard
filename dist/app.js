"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const login_1 = __importDefault(require("./routes/login"));
const rol_1 = __importDefault(require("./routes/rol"));
const pais_1 = __importDefault(require("./routes/pais"));
const ciudad_1 = __importDefault(require("./routes/ciudad"));
const semaforo_1 = __importDefault(require("./routes/semaforo"));
const segmento_1 = __importDefault(require("./routes/segmento"));
const file_upload_1 = __importDefault(require("./routes/file-upload"));
const cliente_1 = __importDefault(require("./routes/cliente"));
const lead_1 = __importDefault(require("./routes/lead"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const server = server_1.default.instance;
/*=================================================
                Body Parser
==================================================*/
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
/*=================================================
                    CORS
==================================================*/
server.app.use(cors_1.default({ origin: true, credentials: true }));
/*=================================================
                    RUTAS
==================================================*/
server.app.use("/usuario", usuario_1.default);
server.app.use("/rol", rol_1.default);
server.app.use("/pais", pais_1.default);
server.app.use("/segmento", segmento_1.default);
server.app.use("/ciudad", ciudad_1.default);
server.app.use("/login", login_1.default);
server.app.use("/fileupload", file_upload_1.default);
server.app.use("/cliente", cliente_1.default);
server.app.use("/lead", lead_1.default);
server.app.use("/semaforo", semaforo_1.default);
// server.app.use("/upload", uploadRoutes);
// server.app.use("/img", imagenesRoutes);
/*=================================================
                    BD
==================================================*/
mongoose_1.default.connect(config_1.URLDB, (err) => {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
    else {
        console.log("BASE DE DATOS ONLINE");
    }
});
/*=================================================
                    SERVIDOR
==================================================*/
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${config_1.PUERTO}`);
});
/*=================================================
                    REQUIRES
==================================================*/
// require("./config/config");
// import express from 'express';
// var mongoose = require("mongoose");
// var bodyParser = require("body-parser");
// var cors = require("cors");
// var app = express();
// import http from 'http';
// import socketIO from 'socket.io';
// import * as socket from './sockets/socket';
// var lead = require('./middlewares/lead');
// export default class App {
//   private static _intance: App;
//   public app: express.Application;
//   public io: socketIO;
//     private httpServer: http.Server;
// app.use(bodyParser.urlencoded({ expented: false }));
// app.use(bodyParser.json());
// app.use(cors({origin:true, credentials:true}));
// escucharSockets();
//Importar rutas
// var appRoutes = require("./routes/app");
// var usuarioRoutes = require("./routes/usuario");
// var loginRoutes = require("./routes/login");
// var rolRoutes = require("./routes/rol");
// var paisRoutes = require("./routes/pais");
// var ciudadRoutes = require("./routes/ciudad");
// var segmentoRoutes = require("./routes/segmento");
// var fileUploadRoutes = require("./routes/file-upload");
// var clienteRoutes = require("./routes/cliente");
// var leadRoutes = require("./routes/lead");
//rutas
// app.use("/usuario", usuarioRoutes);
// app.use("/rol", rolRoutes);
// app.use("/pais", paisRoutes);
// app.use("/segmento", segmentoRoutes);
// app.use("/ciudad", ciudadRoutes);
//  app.use("/login", loginRoutes);
//  app.use("/fileupload", fileUploadRoutes);
// app.use("/cliente", clienteRoutes);
// app.use("/lead", leadRoutes);
// app.use("/upload", uploadRoutes);
// app.use("/img", imagenesRoutes);
/*=================================================
                    BD
==================================================*/
// mongoose.connect(
//   process.env.URLDB,
//   (err, res) => {
//     if (err) throw err;
//     console.log("BASE DE DATOS ONLINE");
//     // console.log(res);
//   }
// );
/*=================================================
                    BD
==================================================*/
// server.listen(process.env.PORT, () => {
//   console.log(`ESCUCHANDO EN EL PUERTO ${process.env.PORT}`);
// });
// function escucharSockets() {
//   console.log('Escuchando conexiones - sockets');
//   io.on('connection', cliente => {
//     console.log('Cliente conectado');
//     // leads por usuario
//     sockets.leadsPorComercial(io);
//     //Desconectado
//     sockets.desconectar(cliente);
//   });
// }
// }
