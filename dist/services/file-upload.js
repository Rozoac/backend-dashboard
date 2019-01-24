"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
aws_sdk_1.default.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-2'
});
let s3 = new aws_sdk_1.default.S3();
let extensionArchivo;
const fileFilter = (req, file, cb) => {
    var archivo = file.originalname;
    var nombreCortado = archivo.split(".");
    extensionArchivo = nombreCortado[nombreCortado.length - 1];
    // TIPOS DE EXTENSIONES
    var extensionesValidas = ["png", "jpg", "jpeg"];
    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        cb(new Error("Las extensiones validas son " + extensionesValidas.join(", ")), false);
    }
    else {
        cb(null, true);
    }
};
var upload = multer_1.default({
    fileFilter,
    storage: multer_s3_1.default({
        s3: s3,
        bucket: 'econtainers',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            console.log(file);
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `usuarios/${Date.now().toString()}.${extensionArchivo}`);
        }
    })
});
exports.default = upload;
