import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = ( cliente: Socket ) => {
         
    cliente.on('disconnect', () => {
      console.log('Cliente desconectado');

    });
}

    // leadsPorComercial: (io) => {
      
    //             Lead.find({'id_usuario': '5c3cdede5d14850017167206'})
    //             .populate({
    //               path: "id_cliente",
    //               // select: 'url fecha text route_image menu slide',
    //               populate: {
    //                 path: 'id_segmento',
    //                 model: 'Segmento'
    //                 // select: 'autenticacion direccion'
    //               }
    //             })
    //             .populate({
    //               path: "id_cliente",
    //               // select: 'url fecha text route_image menu slide',
    //               populate: {
    //                 path: 'id_ciudad',
    //                 model: 'ciudad'
    //                 // select: 'autenticacion direccion'
    //               }
    //             })
    //             .exec((err, leads) => {
    //               if (err) {
    //                 io.emit('respuesta-leads-por-comercidal', err)
    //               }
    //               Lead.count({'id_usuario': '5c3cdede5d14850017167206'}, (err, conteo) => {
                     
    //                 io.emit('respuesta-leads-por-comercials', {
    //                     leads,
    //                     conteo,
    //                     holi: 'holis'
    //                 })
    //             });
    //         });
           
        
        
    //     }
    
    