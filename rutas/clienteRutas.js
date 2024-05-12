const express = require('express');
const rutas = express.Router();
const ClienteModel = require('../models/Cliente');

//endpoint 1.  Leer a todos los clientes existentes
rutas.get('/getCliente', async (req, res) => {
    try  {
        const cliente = await  ClienteModel.find();
        res.json(cliente);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
module.exports = rutas;

//endpoint 2. Crear
rutas.post('/crear', async (req, res) => {
    const cliente = new ClienteModel({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        tdireccion: req.body.direccion,
        c_i: req.body.c_i
    })
    try {
        const nuevaCliente = await cliente.save();
        res.status(201).json(nuevaCliente);
    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});

//endpoint 3. Editar
rutas.put('/editar/:id', async (req, res) => {
    try {
        const clienteEditado = await ClienteModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!clienteEditado)
            return res.status(404).json({ mensaje : 'No se encontro al cliente!!!'});
        else
            return res.status(201).json(clienteEditado);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
})

//ENDPOINT 4. eliminar
rutas.delete('/eliminar/:id',async (req, res) => {
    try {
       const clienteEliminado = await ClienteModel.findByIdAndDelete(req.params.id);
       if (!clienteEliminado)
            return res.status(404).json({ mensaje : 'No se encontro al cliente!!!'});
       else 
            return res.json({mensaje :  'Datos del cliente eliminado correctamente'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});