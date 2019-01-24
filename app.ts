import Server from './classes/server';
import mongoose from 'mongoose';
import usuarioRoutes from "./routes/usuario";
import loginRoutes from "./routes/login";
import rolRoutes from "./routes/rol";
import paisRoutes from "./routes/pais";
import ciudadRoutes from "./routes/ciudad";
import segmentoRoutes from "./routes/segmento";
import fileUploadRoutes from "./routes/file-upload";
import clienteRoutes from "./routes/cliente";
import leadRoutes from "./routes/lead";
import bodyParser from 'body-parser';
import cors from 'cors';
import { URLDB, PUERTO } from './config/config';



const server = Server.instance;
/*=================================================
                Body Parser
==================================================*/
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

/*=================================================
                    CORS
==================================================*/
server.app.use( cors({ origin: true, credentials: true  }) );


/*=================================================
                    RUTAS
==================================================*/
server.app.use("/usuario", usuarioRoutes);
server.app.use("/rol", rolRoutes);
server.app.use("/pais", paisRoutes);
server.app.use("/segmento", segmentoRoutes);
server.app.use("/ciudad", ciudadRoutes);
server.app.use("/login", loginRoutes);
server.app.use("/fileupload", fileUploadRoutes);
server.app.use("/cliente", clienteRoutes);
server.app.use("/lead", leadRoutes);
// server.app.use("/upload", uploadRoutes);
// server.app.use("/img", imagenesRoutes);

/*=================================================
                    BD
==================================================*/
mongoose.connect( URLDB, (err) => {
    if (err){
      console.log(err.message);
      console.log(err);
    }else{
      console.log("BASE DE DATOS ONLINE");
    }
  }
);
/*=================================================
                    SERVIDOR
==================================================*/
server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ PUERTO }`);
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