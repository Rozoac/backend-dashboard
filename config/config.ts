
//CLAVE JWT
export const SEED = "clavesita-op!difil-elcesar123";
//PUERTO
export const PUERTO = process.env.PORT || 3000;
//ENTORNO
export const ENTORNO = process.env.NODE_ENV || 'dev';
//BASE DE DATOS
export let URLDB = ((ENTORNO === 'dev') ? 'mongodb://localhost:27017/dashboard' : "mongodb://wSBwbsRWOT:rEY5SRCEWV@ds257314.mlab.com:57314/econtainers");
