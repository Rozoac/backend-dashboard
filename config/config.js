module.exports.SEED = "clavesita-op!difil-elcesar123";

//PUERTO
process.env.PORT = process.env.PORT || 3000;


//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/econtainers-api'
} else {
    urlDB = "mongodb://wSBwbsRWOT:rEY5SRCEWV@ds257314.mlab.com:57314/econtainers";
}


process.env.URLDB = urlDB;