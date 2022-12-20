const express = require('express');

const Admin = require("../models/Administrador");
const Producto = require('../models/Producto');
const AdminRoute = express.Router();


AdminRoute.get("/", async (req, res) => {
    let admins = await Admin.find({})
    return res.status(200).send({
        sucess:true,
        admins
    });

});

AdminRoute.post("/post", async (req, res) => {
    try {
        const atributos = {nombre, apellido, telefono, edad, direccion, email, numDocumento, tipoDocumento} = req.body
        if(!nombre || !apellido || !telefono || !email || !numDocumento) {

            return res.status(400).send({
                sucess:false, 
                message: "Faltan datos por completar"
            });
        }

        let admin = new Admin({
            nombre, 
            apellido, 
            telefono, 
            edad, 
            direccion, 
            email, 
            numDocumento, 
            tipoDocumento
        });

        await admin.save()
        return res.status(200).send({
            sucess:true,
            message: "Admin creado correctamente",
            admin
        });

    }catch(error) {
        return res.status(500).send({
            sucess: false,
            message: error.message,
        });
    }
})

AdminRoute.put("/update/:id", async (req, res) => {
    const {id} = req.params
    const atributos = {nombre, apellido, telefono, edad, direccion, email, numDocumento, tipoDocumento} = req.body

    let admin = await Admin.findByIdAndUpdate(id, atributos);
    res.status(200).send({
        sucess:true,
        message: "un Admin fue modificado",
        admin
    })
})

AdminRoute.delete("/delete/:id", async (req, res) => {

    try {
        const {id} = req.params
        await Admin.findByIdAndDelete(id)
        res.status(200).send({
            sucess:true,
            message: "Admin eliminado"
        });
    } catch (error) {
        res.status(500).send({
            sucess:false,
            message: error.message
        });
    }
    
})

module.exports = AdminRoute;