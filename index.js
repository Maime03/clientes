//IMPORTACIONES de libs
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// RUTA
const clienteRutas = require('./rutas/clienteRutas');

// CONFIGURACIONES DE environment
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

//MANEJO DE JSON
app.use(express.json());

//CONEXION CON MONGODB
mongoose.connect(MONGO_URI)
.then(() => {
        console.log('Conexion exitosa');
        app.listen(PORT, () => {console.log("Servidor express corriendo en el puerto: "+PORT)})
    }
).catch( error => console.log('error de conexion', error));

//utilizar las rutas DE CLIENTES
app.use('/cliente', clienteRutas);
