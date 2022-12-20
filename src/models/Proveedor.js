const mongoose = require("mongoose");

const ProveedorSchema = new mongoose.Schema({

    empresa: {
        type: String,
        required: true,
    },
    nitEmpresa: {
        type: Number,
        required: true,
    },
    producto: {
        type: String,
        required: true,
    },
    contacto: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }   
},
{ writeConcern: { w: 3, wtimeout: 1000}});

module.exports = mongoose.model("Proveedore", ProveedorSchema);