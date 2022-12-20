const express = require('express');

const Cajero = require("../models/Cajero");
const CajeroRoute = express.Router();


CajeroRoute.get("/", async (req, res) => {
    let cajeros = await Cajero.find({})
    return res.status(200).send({
        sucess:true,
        cajeros
    });

});

CajeroRoute.post("/post", async (req, res) => {
    try {
        const {nombre, apellido, telefono, edad, direccion, email, numDocumento, tipoDocumento} = req.body
        if(!nombre || !apellido || !telefono || !email || !numDocumento) {

            return res.status(400).send({
                sucess:false, 
                message: "Faltan datos por completar"
            });
        }

        let cajero = new Cajero({
            nombre, 
            apellido, 
            telefono, 
            edad, 
            direccion, 
            email, 
            numDocumento, 
            tipoDocumento
        });

        await cajero.save()
        return res.status(200).send({
            sucess:true,
            message: "un Cajero fue creado correctamente",
            cajero,
        });

    }catch(error) {
        return res.status(500).send({
            sucess: false,
            message: error.message,
        });
    }
})

CajeroRoute.put("/update/:id", async (req, res) => {
    const {id} = req.params
    const atributos = {nombre, apellido, telefono, edad, direccion, email, numDocumento, tipoDocumento} = req.body

    let cajero = await Cajero.findByIdAndUpdate(id, atributos)
    res.status(200).send({
        sucess:true,
        message: "un Cajero fue modificado",
        cajero
    })
})

CajeroRoute.delete("/delete/:id", async (req, res) => {

    try {
        const {id} = req.params
        await Cajero.findByIdAndDelete(id)
        res.status(200).send({
            sucess:true,
            message: "un Cajero fue eliminado"
        });
    } catch (error) {
        res.status(500).send({
            sucess:false,
            message: error.message
        });
    }
    
})

module.exports = CajeroRoute;