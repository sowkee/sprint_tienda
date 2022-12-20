const express = require('express');

const Proveedor = require("../models/Proveedor");
const ProveedorRoute = express.Router();


ProveedorRoute.get("/", async (req, res) => {
    let proveedores = await Proveedor.find({})
    return res.status(200).send({
        sucess:true,
        proveedores
    });

});

ProveedorRoute.post("/post", async (req, res) => {
    try {
        const {empresa, nitEmpresa, producto, contacto, total} = req.body
        if(!empresa || !nitEmpresa || !producto || !contacto || !total) {

            return res.status(400).send({
                sucess:false, 
                message: "Faltan datos por completar"
            });
        }

        let proveedor = await Proveedor({
            empresa, 
            nitEmpresa,
            producto, 
            contacto, 
            total
        });

        await proveedor.save()
        return res.status(200).send({
            sucess:true,
            message: "un Proveedor fue creado correctamente",
            proveedor,
        });

    }catch(error) {
        return res.status(500).send({
            sucess: false,
            message: error.message,
        });
    }
})

ProveedorRoute.put("/update/:id", async (req, res) => {
    const {id} = req.params
    const atributos = {empresa, nitEmpresa, producto, contacto, total} = req.body

    let proveedor = await Proveedor.findByIdAndUpdate(id, atributos)
    res.status(200).send({
        sucess:true,
        message: "Proveedor fue modificado",
        proveedor
    })
})

ProveedorRoute.delete("/delete/:id", async (req, res) => {

    try {
        const {id} = req.params
        await Proveedor.findByIdAndDelete(id)
        res.status(200).send({
            sucess:true,
            message: "Proveedor eliminado"
        });
    } catch (error) {
        res.status(500).send({
            sucess:false,
            message: error.message
        });
    }
    
})

module.exports = ProveedorRoute;