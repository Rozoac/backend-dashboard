var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-2'
})
let s3 = new aws.S3()
let extensionArchivo;

const fileFilter = (req, file, cb) => { 
  var archivo = file.originalname;
  var nombreCortado = archivo.split(".");
  extensionArchivo = nombreCortado[nombreCortado.length - 1];
  console.log(extensionArchivo);
  console.log(archivo);
 

  // TIPOS DE EXTENSIONES
  var extensionesValidas = ["png", "jpg", "jpeg"];

  if (extensionesValidas.indexOf(extensionArchivo) < 0) {
    cb(new Error("Las extensiones validas son " + extensionesValidas.join(", ")),false);
  } else{
    cb(null, true);
  }
}
 
var upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'econtainers',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      console.log(file);
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, `usuarios/${Date.now().toString()}.${extensionArchivo}`)
    }
  })
})
module.exports = upload;
