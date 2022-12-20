const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 9000;
require("dotenv").config();


const ProductoRoute = require("./src/routers/ProductoRoute");
const AdminRoute = require("./src/routers/AdminRoute");
const CajeroRoute = require('./src/routers/CajeroRoute');
const ClienteRoute = require('./src/routers/ClienteRoute');
const ProveedorRoute = require('./src/routers/ProveedorRoute');
const VendedorRoute = require('./src/routers/VendedorRoute');

app.use(express.json({extend:true}));
app.use(express.urlencoded());


// Enrutado
app.use("/api/admin", AdminRoute);
app.use("/api/cajero", CajeroRoute);
app.use("/api/cliente", ClienteRoute);
app.use("/api/producto", ProductoRoute);
app.use("/api/proveedor", ProveedorRoute);
app.use("/api/vendedor", VendedorRoute);



// Conexion BBDD
const URL = process.env.mongo_uri;
mongoose
.connect(URL, {})
.then(() => {
  console.log("Conectado al BD")
})
.catch((err) => {
  console.log(err);
});



//routers
app.get("/", (req, res) => {

  res.send("API grupo 3");

});


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});


