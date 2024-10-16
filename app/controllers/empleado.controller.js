const db = require('../config/db.config.js');
const Empleado = db.empleado; // Asegúrate de que el nombre coincide con el modelo que definiste

// Crear un nuevo empleado
exports.create = (req, res) => {
    let empleado = {};

    try {
        // Construyendo el objeto Empleado desde el cuerpo de la solicitud
        empleado.nombre = req.body.nombre;
        empleado.apellido = req.body.apellido;
        empleado.rol = req.body.rol;
        empleado.correo = req.body.correo;
        empleado.sueldo = req.body.sueldo;

        // Guardar en la base de datos MySQL
        Empleado.create(empleado).then(result => {
            res.status(200).json({
                message: "Empleado creado exitosamente con id = " + result.id_emp,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
}

// Recuperar todos los empleados
exports.retrieveAllEmployees = (req, res) => {
    Empleado.findAll()
        .then(employeeInfos => {
            res.status(200).json({
                message: "Empleados recuperados exitosamente!",
                empleados: employeeInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
}

// Obtener un empleado por ID
exports.getEmployeeById = (req, res) => {
    let employeeId = req.params.id;
    Empleado.findByPk(employeeId)
        .then(empleado => {
            if (!empleado) {
                return res.status(404).json({
                    message: "No se encontró el empleado con id = " + employeeId,
                    error: "404"
                });
            }
            res.status(200).json({
                message: "Empleado recuperado exitosamente con id = " + employeeId,
                empleado: empleado
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
}

// Actualizar un empleado por ID
exports.updateById = async (req, res) => {
    try {
        let employeeId = req.params.id;
        let empleado = await Empleado.findByPk(employeeId);

        if (!empleado) {
            return res.status(404).json({
                message: "No se encontró el empleado con id = " + employeeId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                rol: req.body.rol,
                correo: req.body.correo,
                sueldo: req.body.sueldo,
            };
            let result = await Empleado.update(updatedObject, { returning: true, where: { id_emp: employeeId } });

            res.status(200).json({
                message: "Empleado actualizado exitosamente con id = " + employeeId,
                empleado: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el empleado con id = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un empleado por ID
exports.deleteById = async (req, res) => {
    try {
        let employeeId = req.params.id;
        let empleado = await Empleado.findByPk(employeeId);

        if (!empleado) {
            return res.status(404).json({
                message: "No existe un empleado con id = " + employeeId,
                error: "404",
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Empleado eliminado exitosamente con id = " + employeeId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el empleado con id = " + req.params.id,
            error: error.message,
        });
    }
}
