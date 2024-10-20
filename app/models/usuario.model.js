module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id_user: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_emp: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Empleados', // Nombre del modelo al que se referencia
                key: 'id_emp'
            }
        },
        rol: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[0, 1]] // 1 = Admin, 0 = Empleado
            }
        },
        contraseña: {
            type: Sequelize.STRING,
            allowNull: false
        },
        usuario: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });

    return Usuario;
};
