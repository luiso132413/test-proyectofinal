const db = require('../config/db.config.js');
const Usuario = db.Usuario;

exports.create = (req, res) => {
    console.log(req.body);

    let usuario = {};

    try {
        // Extraer los datos del cuerpo de la solicitud
        usuario.id_emp = req.body.id_emp;
        usuario.rol = req.body.rol;
        usuario.contraseña = req.body.contraseña;
        usuario.usuario = req.body.usuario;

        // Guardar en la base de datos
        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado exitosamente con id = " + result.id_user,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
};
