const db = require('../config/db.config.js');
const Empleado = db.Empleado;

exports.create = (req, res) => {
    console.log(req.body);

    let empleado = {};

    try {
        // Extraer los datos del cuerpo de la solicitud
        empleado.nombre = req.body.nombre;
        empleado.apellido = req.body.apellido;
        empleado.correo = req.body.correo;
        empleado.sueldo = req.body.sueldo;
        empleado.rol = req.body.rol;
        empleado.estado = req.body.estado || 'Activo'; // Si no se proporciona, usa el valor predeterminado

        // Guardar en la base de datos
        Empleado.create(empleado).then(result => {
            res.status(200).json({
                message: "Empleado creado exitosamente con id = " + result.id_emp,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el empleado",
            error: error.message
        });
    }
};


