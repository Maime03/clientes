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
        direccion: req.body.direccion,
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

// - 1. Esta consulta busca todos los clientes cuyo nombre sea "Naye".
rutas.get('/busEspefifico', async (req, res) => {
    try {
        const clientesConNombreNaye = await ClienteModel.find({ nombre: "naye" });
       res.status(200).json(clientesConNombreNaye);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// - 2.  Esta consulta utilizará la agregación para calcular el número total de clientes con el que contamos.
rutas.get('/totalCliente', async (req, res) => {
    try {
        const totalClientes = await ClienteModel.aggregate([{ $group: { _id: null, count: { $sum: 1 } } } ]);
       res.status(200).json(totalClientes);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
// - 3.  Esta consulta buscará a los clientes cuyos nombres comiencen con la letra "S", y no importar que sea en mayúsculas o minúsculas.
rutas.get('/busLetra', async (req, res) => {
    try {
        const clientesNombreEmpieceConS = await ClienteModel.find({ nombre: { $regex: /^S/i } });
       res.status(200).json(clientesNombreEmpieceConS);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
// - 4.  Esta consulta de agregación para contar el número de clientes por ciudad
rutas.get('/conteoClientesPorCiudad', async (req, res) => {
    try {
        const conteo = await ClienteModel.aggregate([{ $group: { _id: "$direccion", total: { $sum: 1 } } }]);
        res.json(conteo);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
// - 5.  Esta consulta de clientes que vivan en una dirección específica
rutas.get('/clientesPorDireccion/:direccion', async (req, res) => {
    try {
        const clientes = await ClienteModel.find({ direccion: req.params.direccion });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
// - 6.  Esta consulta de Ordenamiento por nombre y luego por apellidos de forma descendente
rutas.get('/clientesOrdenadosPorNombreYApellidos', async (req, res) => {
    try {
        const clientes = await ClienteModel.find().sort({ nombre: -1, apellidos: -1 });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
