const express = require('express');

const Producto = require("../models/Producto");
const ProductoRoute = express.Router();


ProductoRoute.get("/", async (req, res) => {
    let productos = await Producto.find({});
    return res.status(200).send({
        sucess: true,
        productos
    });

});

ProductoRoute.post("/post", async (req, res) => {
    try {
        const { nombre, descripcion, categoria, precioCompra, precioVenta, proveedor, stockMinimo } = req.body
        if (!nombre || !categoria || !stockMinimo || !proveedor) {

            return res.status(400).send({
                sucess: false,
                message: "Faltan datos por completar"
            });
        }

        let producto = await Producto({
            nombre, 
            descripcion, 
            categoria, 
            precioCompra, 
            precioVenta,
            proveedor, 
            stockMinimo
        });

        await producto.save()
        return res.status(200).send({
            sucess: true,
            message: "Producto creado correctamente",
            producto,
        });

    } catch (error) {
        return res.status(500).send({
            sucess: false,
            message: error.message,
        });
    }
})

ProductoRoute.put("/update/:id", async (req, res) => {
    const { id } = req.params
    const atributos = { nombre, descripcion, categoria, precioCompra, precioVenta, stockMinimo  } = req.body

    let producto = await Producto.findByIdAndUpdate(id, atributos);
    res.status(200).send({
        sucess: true,
        message: "un Producto fue modificado",
        producto
    })
})

ProductoRoute.delete("/delete/:id", async (req, res) => {

    try {
        const { id } = req.params
        await Producto.findByIdAndDelete(id)
        res.status(200).send({
            sucess: true,
            message: "Producto eliminado"
        });
    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: error.message
        });
    }

})

module.exports = ProductoRoute;