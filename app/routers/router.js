let express = require('express');
let router = express.Router();

const empleado = require('../controllers/empleado.controller.js');

// Crear un nuevo empleado
router.post('/api/empelado/create', empleado.create);
router.get('/api/empelado/all', empleado.retriveAllEmpleados);
router.get('/api/empleado/onebyid/:id',empleado.getEmpleadoById);
router.put('/api/empleado/update/:id', empleado.updateById);
router.delete('/api/empleado/delete/:id', empleado.deleteById);

module.exports = router;
