var express = require("express");
const socket = require('socket.io');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Lead = require("../models/lead");

module.exports = {
    desconectar: ( socket ) => {
        socket.on('disconnect', ()=>{
            console.log('Cliente desconectado');
        })
    },

    leadsPorComercial: ( socket, io) => {
        socket.on('leads-por-comercial', ( payload, callback ) => {
              console.log('id recibido', payload.id);
                Lead.find({'id_usuario': payload.id})
                .populate({
                  path: "id_cliente",
                  // select: 'url fecha text route_image menu slide',
                  populate: {
                    path: 'id_segmento',
                    model: 'Segmento'
                    // select: 'autenticacion direccion'
                  }
                })
                .populate({
                  path: "id_cliente",
                  // select: 'url fecha text route_image menu slide',
                  populate: {
                    path: 'id_ciudad',
                    model: 'ciudad'
                    // select: 'autenticacion direccion'
                  }
                })
                .exec((err, leads) => {
                  if (err) {
                    io.emit('respuesta-leads-por-comercidal', err)
                  }
                  Lead.count({'id_usuario': payload.id}, (err, conteo) => {
                      console.log(leads);
                      callback({
                        leads,
                        conteo,
                        holi: 'holis'
                    });
                    io.emit('respuesta-leads-por-comercials', {
                        leads,
                        conteo,
                        holi: 'holis'
                    })
                });
            });
           
        });
        
        }
    }
    