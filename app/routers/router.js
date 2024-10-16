
let express = require('express');
let router = express.Router();
 
const usuario = require('../controllers/usuario.controller.js');
const empleado = require('../controllers/empleado.controller.js');

//Ruta de usuarios
router.post('/api/usuario/create', usuario.create);
router.get('/api/usuario/all', usuario.retrieveAllUsers);
router.get('/api/usuario/onebyid/:id', usuario.getUserById);
router.put('/api/usuario/update/:id', usuario.updateById);
router.delete('/api/usuario/delete/:id', ususario.deleteById);

//Ruta de empleados
router.post('/api/empleado/create', empleado.create);
router.get('/api/empleado/all', empleado.retrieveAllEmployees);
router.get('/api/empleado/onebyid/:id', empleado.getEmployeeById);
router.put('/api/empleado/update/:id', empleado.updateById);
router.delete('/api/empleado/delete/:id', empleado.deleteById);

module.exports = router;