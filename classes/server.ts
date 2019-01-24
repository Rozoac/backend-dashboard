
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';
import { PUERTO } from '../config/config';



export default class Server {

    private static _intance: Server;

    public app: express.Application;

    public io: socketIO.Server;
    private httpServer: http.Server;


    private constructor() {

        this.app = express();

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
    }

    public static get instance() {
        return this._intance || ( this._intance = new this() );
    }


    private escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            // Conectar cliente
            // socket.conectarCliente( cliente );

            // Configurar usuario
            // socket.configurarUsuario( cliente, this.io );

            // Mensajes
            // socket.mensaje( cliente, this.io );

            // Desconectar
            socket.desconectar( cliente );    
            

        });

    }


    start( callback: Function ) {

        this.httpServer.listen( PUERTO, callback );

    }

}