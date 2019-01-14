var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-2'
})
var s3 = new aws.S3()
 
var upload = multer({
  storage: multerS3({
    dest: 'usuarios/',
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
