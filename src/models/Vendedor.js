const mongoose = require("mongoose");

const VendedorSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    edad: {
        type: Number,
        required: false,
    },
    direccion: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    numDocumento: {
        type: Number,
        required: true,
    },
    tipoDocumento: {
        type: String,
        required: false,
    }
    

},
{ writeConcern: { w: 3, wtimeout: 1000}});

module.exports = mongoose.model("Vendedore", VendedorSchema);