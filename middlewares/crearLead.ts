import {Usuario} from "../models/usuario";
import {Lead} from "../models/lead";
import moment from "moment";



// =============================
// Crear un lead nuevo
// =============================
export class CrearLead {

  constructor() { }

   public crear = (cliente:any, callback:any) => {
    this.asignarComercial(cliente.id_segmento, cliente.id_pais, (err:any, user:any) => {
      const comercial = this.getRandomString(user);
      var lead = new Lead({
        id_usuario: comercial._id,
        id_cliente: cliente._id,
        // id_semaforo: body.apellido,
        mensaje: cliente.mensaje,
        fecha_creacion: moment().format('L'),
        hora_creacion: moment().format('LT')
      });
      lead.populate('id_usuario', (err:any) => {
      lead.populate('id_cliente', (err:any) => {
      lead.save((err:any, leadGuardado:any) => {
        if (err) {
          return false;
        }
        // io.emit('respuesta-leads',leadGuardado)
        return callback(null, leadGuardado)
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
