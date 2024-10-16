module.exports = (sequelize, Sequelize) => {
	const Empleado = sequelize.define('empleado', {
		id_emp: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        },
		rol: {
			type: Sequelize.STRING
		},
		correo: {
			type: Sequelize.STRING
		},
		sueldo: {
			type: Sequelize.DOUBLE
		},
        fechaCreacion: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
	});

	return Empleado;
};