import {Usuario} from "../models/usuario";
import {Lead} from "../models/lead";
import moment from "moment";
import Server from '../classes/server';



// =============================
// Crear un lead nuevo
// =============================
export class CrearLead {

  constructor() { }

   public crear = (cliente:any, callback:any) => {
    this.asignarComercial(cliente.id_segmento, cliente.id_pais, (err:any, user:any) => {
      const comercial = this.getRandomString(user);
      const server = Server.instance;
      var lead = new Lead({
        id_usuario: comercial._id,
        id_cliente: cliente._id,
        //id_semaforo: '5c4b3f244bec0f00172a8dd1',
        mensaje: cliente.mensaje,
        fecha_creacion: moment().format('L'),
        hora_creacion: moment().format('LT')
      });
      lead.populate({path: 'id_cliente', populate: {path: 'id_ciudad', model: 'Ciudad'}},  (err:any) => {
      lead.populate({path: 'id_cliente', populate: {path: 'id_segmento', model: 'Segmento'}},  (err:any) => {
      lead.populate({path: 'id_semaforo'},  (err:any) => {
       lead.populate('id_usuario', (err:any) => {
         lead.save((err:any, leadGuardado:any) => {
          if (err) {
          return false;
         }

           server.io.emit('respuesta-leads',leadGuardado);
           return callback(null, leadGuardado)
          });
        });
      });
      });
      });
    })
  }

// ============================================
// Sacar una posicion del arreglo aleatoriamente
// ============================================
  getRandomString = (array:any) => {
    return array[Math.floor(Math.random()*array.length)]
  }

// ============================================
// Asignar un comercial
// ============================================
 asignarComercial = async (segment:any, country:any, callback:any) => {
   await Usuario.find({ segmento : {$all : [segment]}, id_pais: country },'nombre apellido correo ')
           .populate('id_segmento')
           .populate('id_pais')
           .exec((err:any, comerciales:any) => {
            if (err) {
                console.log('se fue a la mierda todo'+ err);
                } 
               return callback(null, comerciales)
    });
  }

} 
