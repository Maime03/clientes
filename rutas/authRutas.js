const express = require('express');
const rutas = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenRevocados = new Set();
const claveSecreta = 'clave_secreta';

// Middleware para verificar tokens
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    if (tokenRevocados.has(token)) return res.status(401).json({ error: 'Token revocado' });

    jwt.verify(token, claveSecreta, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });

        req.usuarioId = decoded.usuarioId;
        next();
    });
};

//Registro 
rutas.post('/registro', async (req, res) => {
    try {
        const { nombreusuario, correo, contrasenia } = req.body;
        const usuario = new Usuario({ nombreusuario, correo, contrasenia});
        await usuario.save();
        res.status(201).json({mensaje: 'Usuario registrado'});
    }
    catch(error){
        res.status(500).json({mensaje: error.message});
    }
});

//Inicio de sesion
rutas.post('/iniciarsesion', async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (!usuario)
            return res.status(401).json({ error : 'Correo invalido!!!!!'});
        const validarContrasena = await usuario.compararContrasenia(contrasenia);
        if (!validarContrasena)
            return res.status(401).json({ error : 'Contrasenia invalido!!!!!'});
        //creacion de token 
        const token = jwt.sign({ usuarioId: usuario._id },'clave_secreta', {expiresIn: '1h'});
        res.json( {token});
    }
    catch(error){
        res.status(500).json({mensaje: error.message});
    }
});

// Cerrar sesión
rutas.post('/cerrarsesion', verificarToken, (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        tokenRevocados.add(token);
        res.json({ mensaje: 'Sesión cerrada correctamente' });
    } else {
        res.status(400).json({ error: 'No se pudo cerrar la sesión' });
    }
});

// Middleware para rutas protegidas
rutas.get('/ruta_protegida', verificarToken, (req, res) => {
    res.json({ mensaje: 'Acceso concedido a la ruta protegida' });
});


module.exports = rutas;