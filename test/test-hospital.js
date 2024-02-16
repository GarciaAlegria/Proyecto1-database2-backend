const assert = require('assert');
const request = require('supertest');
const app = require('../server'); // Asegúrate de que la ruta al archivo server.js es correcta
var random = require('random-name')

describe('Test Funcionales backend', () => {
    it('Test 1: Devolver un array de hospitales aprobados', (done) => {
      request(app)
        .get('/api/v1/hospitales')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert(Array.isArray(res.body), 'La respuesta no es un array');
          assert(res.body.every(hospital => hospital.estado === 'aprobado'), 'No todos los hospitales tienen estado aprobado');
          done();
        });
    });

 
    it('Test 2: Agregar un nuevo hospital', (done) => {
      const newHospital = {
        name: random.place(),
        direc: '123 mixco',
        descrip: 'hola a todos',
        zona: '7',
        correo: 'user1@example.com'
      };

      request(app)
        .post(`/api/v1/hospitales/addHospital/${newHospital.name}&${newHospital.direc}&${newHospital.descrip}&${newHospital.zona}&${newHospital.correo}`)
        //.post('/api/v1/hospitales/addHospital/:name&:direc&:descrip&:zona&:correo')
        .send(newHospital)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.strictEqual(res.body, true, 'El hospital no se agregó correctamente');
          done();
        });
    });

  
    it('Test 3: Mostrar todos los hospitales con todos los estados', (done) => {
      request(app)
        .get('/api/v1/hospitales/estados')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert(Array.isArray(res.body), 'La respuesta no es un array');
          done();
        });
    });

    it('Test 4: Actualizar estado de un hospital mediante su id a "aprobado', (done) => {
      const hospitalId = 1; // Reemplaza con el ID válido de un hospital existente

      request(app)
        .put(`/api/v1/hospitales/updateEstado/${hospitalId}&aprobado`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.strictEqual(res.body, true, 'El estado del hospital no se actualizó correctamente');
          done();
        });
    });
  });