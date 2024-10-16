const db = require('../config/db.config.js');
const Empleado = db.Empleado;

exports.create = (req, res) => {
    console.log(req.body);
    
    let empleado = {};

    try{
        empleado.nombre = req.body.nombre;
        empleado.apellido = req.body.apellido;
        empleado.rol = req.body.rol;
        empleado.correo = req.body.correo;
        empleado.sueldo = req.body.sueldo;

        //Guardar en la base de datos
        Empleado.create(empleado).then(result => {
            res.status(200).json({
                messege: "Empleado creado existosamente con id = " + result.id_emp,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el libro",
            error: error.message
        });
    }
}

exports.retriveAllEmpleados = (req, res) => {
    // Recupera todos los empleados
    Empleado.findAll()
       .then(empleados => {
            res.status(200).json({
                message: "Empleados recuperados exitosamente!",
                empleados: empleados
            });
        })
       .catch(error => {
            res.status(500).json({
                message: "Error al recuperar los empleados",
                error: error.message
            });
        });
}

exports.getEmpleadoById = (req, res) => {
    // Recupera un empleado por su id

    let empleadoId = req.params.id;

    Empleado.findByPk(empleadoId)
       .then(empleado => {
            if (!empleado) {
                return res.status(404).json({
                    message: "Empleado no encontrado!"
                });
            }
            res.status(200).json({
                message: "Empleado recuperado exitosamente!",
                empleado: empleado
            });
        })
       .catch(error => {
            res.status(500).json({
                message: "Error al recuperar el empleado",
                error: error.message
            });
        });
}

exports.updateById = async (req, res) => {
    // Actualiza un empleado por su id

    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "Empleado no encontrado! para actualizar con id = " + empleadoId,
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                rol: req.body.rol,
                correo: req.body.correo,
                sueldo: req.body.sueldo,
            }

            let resutl = await Empleado.update(updateObject, {returning: true, where: {id_empleado: empleadoId}});

            if(!result){
                res.status(500).json({
                    message: "Error al actualizar el empleado para id = " + req.params.id_emp,
                    error: "No se pudo actualizar el empleado"
                })
            }

            res.status(200).json({
                message: "Empleado actualizado existosamente con id = " + empleadoId,
                empleado: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el libro con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    // Elimina un empleado por su id
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No existe un Empleado con id = " + empleadoId,
                error: "404",
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Empleado eliminado exitosamente con id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el libro con id = " + req.params.id,
            error: error.message,
        });
    }
}