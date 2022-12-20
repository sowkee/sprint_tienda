const express = require('express');

const Cliente = require("../models/Cliente");
const ClienteRoute = express.Router();


ClienteRoute.get("/", async (req, res) => {
    let clientes = await Cliente.find({})
    return res.status(200).send({
        sucess:true,
        clientes
    });

});

ClienteRoute.post("/post", async (req, res) => {
    try {
        const {nombre, apellido, telefono, edad, direccion, email, numDocumento, tipoDocumento} = req.body
        if(!nombre || !apellido || !telefono || !email || !numDocumento) {

            return res.status(400).send({
                sucess:false, 
                message: "Faltan datos por completar"
            });
        }

        let cliente = new Cliente({
            nombre, 
            apellido, 
            telefono, 
            edad, 
            direccion, 
            email, 
            numDocumento, 
            tipoDocumento
        });

        await cliente.save()
        return res.status(200).send({
            sucess:true,
            message: "un cliente fue creado correctamente",
            cliente,
        });

    }catch(error) {
        return res.status(500).send({
            sucess: false,
            message: error.message,
        });
    }
})

ClienteRoute.put("/update/:id", async (req, res) => {
    const {id} = req.params
    const atributos = {nombre, apellido, telefono, edad, direccion, email, numDocumento, tipoDocumento} = req.body

    let cliente = await Cliente.findByIdAndUpdate(id, atributos)
    res.status(200).send({
        sucess:true,
        message: "un Cliente fue modificado",
        cliente
    })
})

ClienteRoute.delete("/delete/:id", async (req, res) => {

    try {
        const {id} = req.params
        await Cliente.findByIdAndDelete(id)
        res.status(200).send({
            sucess:true,
            message: "un Cliente fue eliminado"
        });
    } catch (error) {
        res.status(500).send({
            sucess:false,
            message: error.message
        });
    }
    
})

module.exports = ClienteRoute;