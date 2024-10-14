
let express = require('express');
let router = express.Router();
 
const user = require('../controllers/user.controller.js');

//Ruta de usuarios
router.post('/api/user/create', user.create);
router.get('/api/user/all', user.retrieveAllUsers);
router.get('/api/user/onebyid/:id', user.getUserById);
router.put('/api/user/update/:id', user.updateById);
router.delete('/api/user/delete/:id', user.deleteById);

module.exports = router;