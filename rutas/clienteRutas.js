const express = require('express');
const rutas = express.Router();
const ClienteModel = require('../models/Cliente');

//endpoint traer a todos lo clientes
rutas.get('/getCliente', async (req, res) => {
    try  {
        const cliente = await  ClienteModel.find();
        res.json(cliente);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
module.exports = rutas;

