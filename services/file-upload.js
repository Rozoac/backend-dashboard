var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-2'
})
var s3 = new aws.S3()

const fileFilter = (req, file, cb) => { 
  // var archivo = file.mimetype;
  // var nombreCortado = archivo.name.split(".");
  // var extensionArchivo = nombreCortado[nombreCortado.length - 1];
  console.log(file);

  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  else{
    console.log("etro al else");
    cb(new Error('Solo imagenes'),false);
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
      cb(null, `usuarios/${Date.now().toString()}.png`)
    }
  })
})
module.exports = upload;
