const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: false,
    },
    categoria: {
        type: String,
        required: true,
    },
    precioCompra: {
        type: Number,
        required: false,
    },
    precioVenta: {
        type: Number,
        required: false,
    },
    proveedor: {
        type: String,
        required: true,
    },
    stockMinimo: {
        type: Number,
        required: true,
    }  
},
{ writeConcern: { w: 3, wtimeout: 1000}});

module.exports = mongoose.model("Producto", ProductoSchema);