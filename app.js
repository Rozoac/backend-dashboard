/*=================================================
                    REQUIRES
==================================================*/
require("./config/config");
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

/*=================================================
                    CORS
==================================================*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  next();
});

app.use(bodyParser.urlencoded({ expented: false }));
app.use(bodyParser.json());

//Importar rutas
  var appRoutes = require("./routes/app");
  var usuarioRoutes = require("./routes/usuario");
  var loginRoutes = require("./routes/login");
  var rolRoutes = require("./routes/rol");
  var paisRoutes = require("./routes/pais");
  var ciudadRoutes = require("./routes/ciudad");
  var segmentoRoutes = require("./routes/segmento");
  var fileUploadRoutes = require("./routes/file-upload");
  var clienteRoutes = require("./routes/cliente");
  var leadRoutes = require("./routes/lead");


//rutas
app.use("/usuario", usuarioRoutes);
app.use("/rol", rolRoutes);
app.use("/pais", paisRoutes);
app.use("/segmento", segmentoRoutes);
app.use("/ciudad", ciudadRoutes);
 app.use("/login", loginRoutes);
 app.use("/fileupload", fileUploadRoutes);
app.use("/cliente", clienteRoutes);
app.use("/lead", leadRoutes);
// app.use("/upload", uploadRoutes);
// app.use("/img", imagenesRoutes);


/*=================================================
                    BD
==================================================*/
mongoose.connect(
  process.env.URLDB,
  (err, res) => {
    if (err) throw err;
    console.log("BASE DE DATOS ONLINE");
    // console.log(res);
  }
);

// SERVIDOR
app.listen(process.env.PORT, () => {
  console.log(`ESCUCHANDO EN EL PUERTO ${process.env.PORT}`);
});
