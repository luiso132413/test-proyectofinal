const db = require('../config/db.config.js');
const Usuario = db.usuario; // Asegúrate de que el nombre coincide con el modelo que definiste

// Crear un nuevo usuario
exports.create = (req, res) => {
    let usuario = {};

    try {
        // Construyendo el objeto Usuario desde el cuerpo de la solicitud
        usuario.nombreUsuario = req.body.nombreUsuario;
        usuario.rol = req.body.rol;
        usuario.contraseña = req.body.contraseña; // Recuerda encriptar la contraseña antes de guardarla

        // Guardar en la base de datos MySQL
        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado exitosamente con id = " + result.id_user,
                user: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
}

// Recuperar todos los usuarios
exports.retrieveAllUsers = (req, res) => {
    Usuario.findAll()
        .then(userInfos => {
            res.status(200).json({
                message: "Usuarios recuperados exitosamente!",
                users: userInfos
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

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    let userId = req.params.id;
    Usuario.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "No se encontró el usuario con id = " + userId,
                    error: "404"
                });
            }
            res.status(200).json({
                message: "Usuario recuperado exitosamente con id = " + userId,
                user: user
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

// Actualizar un usuario por ID
exports.updateById = async (req, res) => {
    try {
        let userId = req.params.id;
        let usuario = await Usuario.findByPk(userId);

        if (!usuario) {
            return res.status(404).json({
                message: "No se encontró el usuario con id = " + userId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombreUsuario: req.body.nombreUsuario,
                rol: req.body.rol,
                contraseña: req.body.contraseña, // Recuerda encriptar la contraseña si es necesario
            };
            let result = await Usuario.update(updatedObject, { returning: true, where: { id_user: userId } });

            res.status(200).json({
                message: "Usuario actualizado exitosamente con id = " + userId,
                user: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el usuario con id = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un usuario por ID
exports.deleteById = async (req, res) => {
    try {
        let userId = req.params.id;
        let usuario = await Usuario.findByPk(userId);

        if (!usuario) {
            return res.status(404).json({
                message: "No existe un usuario con id = " + userId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado exitosamente con id = " + userId,
                user: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
}
