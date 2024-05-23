const express = require('express');
const rutas = express.Router();
const EquipoModel = require('../models/Equipo');
const UsuarioModel = require('../models/Usuario');

//endpoint 1.  Leer  todos los equipos existentes
rutas.get('/getEquipo', async (req, res) => {
    try  {
        const equipos = await  EquipoModel.find();
        res.json(equipos);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

//endpoint 2. Registar Equipo
rutas.post('/crearEquipo', async (req, res) => {
    const equipo = new EquipoModel({
        mac: req.body.mac,
        marca: req.body.marca,
        modelos: req.body.modelos,
        procedencia: req.body.procedencia,
    })
    try {
        const nuevoEquipo = await equipo.save();
        res.status(201).json(nuevoEquipo);
    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});

//endpoint 3. Editar Equipo
rutas.put('/editarEquipo/:id', async (req, res) => {
    try {
        const equipoEditado = await EquipoModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!equipoEditado)
            return res.status(404).json({ mensaje : 'No se encontro al equipo!!!'});
        else
            return res.status(201).json(equipoEditado);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
})

//ENDPOINT 4. eliminar
rutas.delete('/eliminarEquipo/:id',async (req, res) => {
    try {
       const equipoEliminado = await EquipoModel.findByIdAndDelete(req.params.id);
       if (!equipoEliminado)
            return res.status(404).json({ mensaje : 'No se encontro el equipo!!!'});
       else 
            return res.json({mensaje :  'Datos del equipo eliminado correctamente'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
//REPORTE 1
rutas.get('/clientesConEquipos', async (req, res) => {
    try {
        const clientesConEquipos = await ClienteModel.aggregate([
            {
                $lookup: {
                    from: 'equipos',
                    localField: 'usuario',
                    foreignField: '_id',
                    as: 'equipos_asignados'
                }
            }
        ]);
        res.json(clientesConEquipos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});


module.exports = rutas;