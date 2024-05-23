const mongoose = require('mongoose');
//DEFINIR ESQUEMA
const clienteSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
    nombre: String,
    apellidos: String,
    telefono: Number,
    direccion: String,
    c_i: Number
});

const ClienteModel = mongoose.model('Cliente',clienteSchema, 'cliente');
module.exports = ClienteModel;
