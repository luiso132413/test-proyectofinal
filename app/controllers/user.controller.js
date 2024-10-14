const db = require('../config/db.config.js');
const User = db.User;

exports.create = (req, res) => {
    let user = {};

    try {
        // Construyendo el objeto User desde el cuerpo de la solicitud
        user.username = req.body.username;
        user.role = req.body.role;
        user.password = req.body.password;

        // Guardar en la base de datos MySQL
        User.create(user).then(result => {    
            // Enviar mensaje de confirmación al cliente
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

exports.retrieveAllUsers = (req, res) => {
    // Encontrar toda la información de los usuarios
    User.findAll()
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

exports.getUserById = (req, res) => {
    let userId = req.params.id;
    User.findByPk(userId)
        .then(user => {
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

exports.updateById = async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({
                message: "No se encontró el usuario con id = " + userId,
                user: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                username: req.body.username,
                role: req.body.role,
                password: req.body.password,
            };
            let result = await User.update(updatedObject, { returning: true, where: { id_user: userId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el usuario con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

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

exports.deleteById = async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({
                message: "No existe un usuario con id = " + userId,
                error: "404",
            });
        } else {
            await user.destroy();
            res.status(200).json({
                message: "Usuario eliminado exitosamente con id = " + userId,
                user: user,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
}
