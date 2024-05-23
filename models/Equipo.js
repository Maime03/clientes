const mongoose = require('mongoose');
//DEFINIR ESQUEMA
const equipoSchema = new mongoose.Schema({

    mac: String,
    marca: String,
    modelos: String,
    procedencia: String
});

const EquipoModel = mongoose.model('Equipo',equipoSchema, 'equipo');
module.exports = EquipoModel;
