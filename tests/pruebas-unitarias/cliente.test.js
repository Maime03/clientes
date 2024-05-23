const express = require('express');
const request = require('supertest');
const clienteRutas = require('../../rutas/clienteRutas');
const ClienteModel = require('../../models/Cliente');
const mongoose  = require('mongoose');
const app = express();
app.use(express.json());
app.use('/getCliente', clienteRutas);

describe('Pruebas Unitarias para Clientes', () => {
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect('mongodb://localhost:27017/sitdtelbol',{
            useNewUrlParser : true,            
        });
        await ClienteModel.deleteMany({});
    });
    // al finalziar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
      });

    //1er test : GET

    test('Deberia agregar un nuevo Cliente : POST: /crear', async() => {
        const nuevoCiente = {
            nombre: 'juan',
            apellidos: 'mamani, vargas',
            telefono: '655268528',
            direccion: 'ivirgatzama',
            c_i: '55855525',

        };
        const res =  await request(app)
                            .post('/Cliente/crear')
                            .send(nuevaCliente);
        expect(res.statusCode).toEqual(201);
        expect(res.body.nombre).toEqual(nuevaCliente.nombre);
    });
   
});