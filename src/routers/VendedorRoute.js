const express = require('express');

const Vendedor = require("../models/Vendedor");
const VendedorRoute = express.Router();


VendedorRoute.get("/", async (req, res) => {
    let vendedores = await Vendedor.find({})
    return res.status(200).send({
        sucess:true,
        vendedores
    });

});

VendedorRoute.post("/post", async (req, res) => {
    try {
        const {nombre, apellido, telefono, edad, direccion, email, numDocumento, tipoDocumento} = req.body
        if(!nombre || !apellido || !telefono || !email || !numDocumento) {

            return res.status(400).send({
                sucess:false, 
                message: "Faltan datos por completar"
            });
        }

        let vendedor = new Vendedor({
            nombre, 
            apellido, 
            telefono, 
            edad, 
            direccion, 
            email, 
            numDocumento, 
            tipoDocumento
        });

        await vendedor.save()
        return res.status(200).send({
            sucess:true,
            message: "Vendedor creado correctamente",
            vendedor,
        });

    }catch(error) {
        return res.status(500).send({
            sucess: false,
            message: error.message,
        });
    }
})

VendedorRoute.put("/update/:id", async (req, res) => {
    const {id} = req.params
    const {age} = req.body

    let vendedor = await Vendedor.findByIdAndUpdate(id, {age})
    res.status(200).send({
        sucess:true,
        message: "Vendedor fue modificado",
        vendedor
    })
})

VendedorRoute.delete("/delete/:id", async (req, res) => {

    try {
        const {id} = req.params
        await Vendedor.findByIdAndDelete(id)
        res.status(200).send({
            sucess:true,
            message: "Vendedor eliminado"
        });
    } catch (error) {
        res.status(500).send({
            sucess:false,
            message: error.message
        });
    }
    
})

module.exports = VendedorRoute;